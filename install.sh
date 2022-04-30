#!/bin/bash

yarn install

cd apps/api

npx prisma generate
