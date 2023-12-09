# Backend

This is the backend part of the project.

## Prerequisites

- Node.js installed
- With nvm use **node version 16**

`nvm use 16`

- npm (Node Package Manager) installed

## Install dependencies

`yarn install` or `npm install`

## Before starting project

- Change Database config in .env file 
- Use Postgres DB
- Perform Migrations with following cmd (make sure you are in db folder):

`cd db`

`npx sequelize-cli db:migrate`

- To undo migrations with following cmd (make sure you are in db folder):

`cd db`

`npx sequelize-cli db:migrate:undo:all`

- Seed Data with following cmd (make sure you are in db folder):
- Make sure you configured path to csv file!!! Put it in db folder for simple use.

`cd db`

`npx sequelize-cli db:seed:all`

If you are having bug with seeding check if you are using node v16!

## Start Project

`node index.js`





