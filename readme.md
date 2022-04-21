# Auax Music Quiz

Development started around the following date: **2nd of April 2022**

## Enviroment variables

**Under the root dir (" / ")**

- `DEVELOPMENT_MODE`= True
- `ALLOWED_ORIGINS`= *
- `FLASK_APP_SECRET_KEY`= _<randomly_generated_key>_
- `SPOTIFY_CLIENT_ID`= _<spotify_client_id>_
- `SPOTIFY_CLIENT_SECRET`= _<spotify_client_secret>_
- `SPOTIFY_SCOPE`= ~~_<necessary_spotify_scopes>_~~ **(not currently used)**

**Under the client dir (" /client ")**

- `REACT_APP_API_URL`= http://localhost:8000
  _(Dev only, for deployement use domain)_