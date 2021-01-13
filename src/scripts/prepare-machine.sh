#!/bin/bash

# THIS SCRIPT SHOULD BE EXECUTED MANUALLY!

# prevent script execution
exit 1

### prepare the system

# update and upgrade
sudo apt update
sudo apt upgrade

# install jq
sudo apt install jq

# install docker
# https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo curl -L "https://github.com/docker/compose/releases/download/1.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# enable docker service
sudo systemctl start docker
sudo systemctl enable docker

# unlock ufw
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# create user, give him premissions to edit /app
sudo useradd www # add new user
sudo passwd www # set new password to user
sudo usermod -a -G docker www # add www user to docker group

sudo mkdir /app

sudo mkdir /app/project
sudo mkdir /app/env
sudo mkdir /app/tmp

sudo chgrp -R docker /app # change group of app folder
sudo chmod -R g+rw /app # give read write access for docker group

sudo -u www bash # switch to www user

# pull project
rm -rfv /app/project/{*,.*} # remove existing project data if exists
git clone "https://github.com/thebartekbanach/portfolio.git" "/app/project" # initialize the repository

# add project environment variables
cp /app/project/src/env/examples/Portfolio.Deploy.env /app/env/Prod.Portfolio.Deploy.env
cp /app/project/src/env/examples/Portfolio.Proxy.env /app/env/Prod.Portfolio.Proxy.env
cp /app/project/src/env/examples/Portfolio.Client.env /app/env/Prod.Portfolio.Client.env
cp /app/project/src/env/examples/Portfolio.EmailGateway.env /app/env/Prod.Portfolio.EmailGateway.env
#! now use nano and set environment variables inside /app/env/*.env files

# download, build, and start application
bash /app/project/src/scripts/deploy.sh