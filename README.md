# Welath App

This is an app for managment of wealth. It allows you to introduce your finance and display different financial statements

## What's inside?

This [turborepo](https://turborepo.org) uses [Yarn](https://yarnpkg.com) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: a [fastify](https://www.fastify.io) api
- `web`: a [Next.js](https://nextjs.org) app
- `ui`: a stub React component library shared by applications
- `schemas`: a set of [TypeBox](https://github.com/sinclairzx81/typebox) schemas shared by applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `babelconfig`: `babel` configurations

## Setup

A `tools.js` script exists to handle the development environment installation.

To install all dependencies run the following command:

```
node tools.js install
```

To create the environment files run the following command:

```
node tools.js install-env
```

## Develop

There are two ways to run the local environment to start develop.

1. Using [Docker](https://docs.docker.com/get-docker/):

    To build the docker image run the following command:

    ```
    node tools.js docker-build
    ```

    Once the process has finished, you'd need to modify your `.env` files first according to your setup. Check the default [SuperTokens](https://supertokens.com) and [PostgreSQL](https://www.postgresql.org) configuration in the [docker-compose.yml](docker-compose.yml) file.

    - apps/api/.env

    - apps/web/.env.local

    To start the local development environment run the following command:

    ```
    docker-compose up
    ```

2. Without Docker:

    This application depends on:
    
    - [SuperTokens](https://supertokens.com/docs/passwordless/quick-setup/core/without-docker) to handle user authentication.
    
    - [PostgreSQL](https://www.postgresql.org/download/) to store all data.

    You can run those dependencies using Docker or standalone. Please make sure your `.env` files are configured correctly.

    - apps/api/.env

    - apps/web/.env.local

    To start the development server run the following command:

    ```
    yarn dev
    ```
