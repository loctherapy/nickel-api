# NICKEL API

## Installation

`npm i`

## Running the app

`npm start`

## Configure the app

The app can be configured in config.js file.

### Connection string to the MongoDB

The connection string is configured **dbUri** section.

### Admins

Predefined admins are configured in the **predefinedRoles -> admins** section. Each time the app starts it verifies if the admins exist in the db and if not - creates accounts for them.
