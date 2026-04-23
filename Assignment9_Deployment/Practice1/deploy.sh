#!/bin/bash

echo "Deploying environment: $NODE_ENV"

npm install

if [ "$NODE_ENV" = "production" ]; then
  echo "Running production deployment checks"
fi

node practice_1_multi_environment_deployment.js