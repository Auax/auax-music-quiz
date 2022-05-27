# Express backend

---

# Commands

## To install:

#### `yarn install`

## To run:

#### `yarn start`

## Environment variables in `/backend`:

- `PORT`=8000
- `ADMIN_USER`= [_user_]
- `ADMIN_PASSWORD`= [_password_]
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

## Build

Build: `yarn build`

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
        .min(1)
        .max(3)
});
```
