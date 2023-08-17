# Cafes coding test

## Install / Run
- This applications can be setup and run using docker compose, so you will need docker installed on your system to run this.
- To start  run : `docker compose -f docker/docker-compose.yaml up [-d]` from the root directory of this repository
- The application may take a few seconds to start, due to the healthcheck on the database

## Stack used
- Front 
    - React
    - Redux
    - Redux Saga
    - Material UI
    - Typescript
- Back
    - Nodejs (v18)
    - Express
    - Typescript
- Database
    - Mysql (You can find the database schema declaration in `docker/volumes/initdb.d/init_database.sql`)

