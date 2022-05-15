# Auax Music Quiz

### Deezer Version - No OAUTH method!


Development started around the following date: **2nd of April 2022**

## TODO:
* Add more modes
* Fix styling / UI (Change bg maybe?)
* Organize project

## Important

Add a file called `_redirects` with `/* /index.html 200` inside the build directory if you're using Netlify.

## Enviroment variables

**Under the root dir (" / ")**

- `ALLOWED_ORIGIN`= * (dev only, use actual client url for this)
- `APP_SECRET_KEY`= [randomly_generated_key]
- `ADMIN_USER`= [user] (username to create a new mode)
- `ADMIN_PASSWORD`= [password] (password to create a new mode)
- `DATABASE_URI` = [postgresql URI]

**Under the client dir (" /client ")**

* `REACT_APP_API_URL`= _API URL_
