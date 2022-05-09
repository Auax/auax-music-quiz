# Auax Music Quiz

Development started around the following date: **2nd of April 2022**

## TODO:
* Create the cookies using the set-cookie header (fix)
* Add more modes / custom playlist mode
* Fix styling / UI
* Organize project

## Enviroment variables

**Under the root dir (" / ")**

- `ALLOWED_ORIGIN`= *
- `APP_SECRET_KEY`= _<randomly_generated_key>_
- `SPOTIFY_CLIENT_ID`= _<spotify_client_id>_
- `SPOTIFY_CLIENT_SECRET`= _<spotify_client_secret>_
- `SPOTIFY_REDIRECT_URI` = http://localhost:3000/login/callback (dev only, use actual URL in deployment)

**Under the client dir (" /client ")**

* `REACT_APP_API_URL`= _API URL_
