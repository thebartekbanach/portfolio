#!/bin/bash

set -o allexport

echo "Loading environment variables for Prod.Portfolio.Deploy"
source /app/env/Prod.Portfolio.Deploy.env

echo "Loading environment variables for Prod.Portfolio.Proxy"
source /app/env/Prod.Portfolio.Proxy.env

echo "Loading environment variables for Prod.Portfolio.Client"
source /app/env/Prod.Portfolio.Client.env

echo "Loading environment variables for Prod.Portfolio.EmailGateway"
source /app/env/Prod.Portfolio.EmailGateway.env

set +o allexport

echo "Building docker images"

cd /app/tmp/latest/src
docker-compose -f prod.docker-compose.yml build