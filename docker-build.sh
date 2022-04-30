#!/bin/bash

mkdir -p json

cp yarn.lock json/

cp turbo.json json/

cp --parents \
  $(find . -name package.json | grep -v node_modules) \
  json/

docker-compose build
