# Auax Music Quiz

### No OAUTH method!

(I'm using my account to fetch the songs, it's the only way to do this currently since other users can't log in because
of Spotify's API).

Development started around the following date: **2nd of April 2022**

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

- `ALLOWED_ORIGIN`= * (dev only, use actual client url for this)
- `APP_SECRET_KEY`= _<randomly_generated_key>_
- `SPOTIFY_CLIENT_ID`= _<spotify_client_id>_
- `SPOTIFY_CLIENT_SECRET`= _<spotify_client_secret>_
- `SPOTIFY_REDIRECT_URI` = https://_your_domain_/callback
- `AUTH_CACHE` = _<`.cache` content>_

**Under the client dir (" /client ")**

* `REACT_APP_API_URL`= _API URL_
