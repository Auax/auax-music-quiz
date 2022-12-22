# React Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

# Commands

## To install:

#### `yarn install`

## To run:

#### `yarn start`

## Environment variables in `/frontend`:

You must only specify the following variable:

`REACT_APP_API_URL=API URL`

## Build & Deploy

Before building, make sure the `REACT_APP_API_URL` value inside the .env file is correct, as it will change the final
build. Also, it's not safe to include sensible information inside this .env file.

Build: `yarn build`

Deploy: `netlify deploy --prod --dir ./build` (must specify the `./build` directory)