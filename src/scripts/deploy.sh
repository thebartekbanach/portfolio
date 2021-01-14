#!/bin/bash

source /app/env/Prod.Portfolio.Deploy.env

function gh_curl() {
  curl -H "Authorization: token $GITHUB_PERSONAL_ACCESS_TOKEN" \
       -H "Accept: application/vnd.github.v3.raw" \
       $@
}

echo "Fetching latest release id of $GITHUB_REPOSITORY_NAME"
LATEST_TAG=`gh_curl -s https://api.github.com/repos/$GITHUB_REPOSITORY_NAME/releases | jq -r .[0].tag_name`

echo "Downloading latest release: $LATEST_TAG"
wget -q --auth-no-challenge https://$GITHUB_PERSONAL_ACCESS_TOKEN:@api.github.com/repos/$GITHUB_REPOSITORY_NAME/tarball/$LATEST_TAG -O /app/tmp/latest.tar.gz

echo "Unpacking latest release"

mkdir /app/tmp/latest
tar -zxf /app/tmp/latest.tar.gz -C /app/tmp/latest
mv /app/tmp/latest/$(tar -tf /app/tmp/latest.tar.gz | head -n 1)/{.[!.],}* /app/tmp/latest/
rm /app/tmp/latest.tar.gz

echo "Building production environment"
bash /app/tmp/latest/src/scripts/build.sh

echo "Turning the production environment down"
cd /app/project/src
docker-compose -f prod.docker-compose.yml down

echo "Removing old project files"
rm -rf /app/project/{*,.*}

echo "Moving latest release to production directory"
mv /app/tmp/latest/{.[!.],}* /app/project

echo "Removing temporary deploy files"
rm -rf /app/tmp/{*,.*}

echo "Starting the production environment up"
cd /app/project/src
docker-compose -f prod.docker-compose.yml up --detach --remove-orphans