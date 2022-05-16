# Auax Music Quiz

Development started around the following date: **2nd of April 2022**

### A quiz game isn't allowed in Spotify's TOS. That's why I currently use Deezer's API.

## TODO:

* ~~Fix REFRESH_TOKEN ERROR!~~
* Create the cookies using the set-cookie header (fix)
* Add more modes / ~~custom playlist mode~~
* ~~Finish the create mode page~~
* ~~Fix answer title color in `lofi` theme~~
* Fix styling / UI (Change bg maybe?)
* Organize project

## Important

Add a file called `_redirects` with `/* /index.html 200` inside the build directory if you're using Netlify.

## Enviroment variables

**Under the root dir (" / ")**

- `ALLOWED_ORIGIN`= *
- `APP_SECRET_KEY`= _<randomly_generated_key>_
- `SPOTIFY_CLIENT_ID`= _<spotify_client_id>_
- `SPOTIFY_CLIENT_SECRET`= _<spotify_client_secret>_
- `SPOTIFY_REDIRECT_URI` = http://localhost:3000/login/callback (dev only, use actual URL in deployment)

**Under the client dir (" /client ")**

* `REACT_APP_API_URL`= _API URL_
