#!/bin/bash

BASE_DIRECTORY=json

function copy_different_file () {
  file=$1

  if ! cmp -s $file $BASE_DIRECTORY/$file
  then
    echo "Copying $file"
    cp --parents $file $BASE_DIRECTORY/
  fi  
}

mkdir -p $BASE_DIRECTORY

copy_different_file yarn.lock

copy_different_file turbo.json

package_json_list=$(find . -type f -name "package.json" | grep -v node_modules | grep -v $BASE_DIRECTORY/)
for package_json in $package_json_list
do
  copy_different_file $package_json
done

docker-compose build
