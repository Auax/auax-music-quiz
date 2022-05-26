# Auax Music Quiz

### Express.js :: Deezer Version

Development started around the following date: **2nd of April 2022**

## TODO:

* Add more modes
* Can't answer when the game is paused
* Song answer shows for less than a second (enough time though).

## Enviroment variables

I will update this when the Express backend code is finished.

# Client

Find the client ***readme*** under `./client`

# Database Schema

### Create mode schema

**Javascript** Joi schema:

```js
export const modeSchema = Joi.object({
    pid: Joi.string()
        .required(),
    title: Joi.string()
        .required(),
    genre: Joi.string()
        .min(2)
        .max(30)
        .required(),
    image: Joi.string()
        .max(2000)
        .required(),
    difficulty: Joi.number()
        .integer()
});
```
