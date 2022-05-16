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

# Database Schema

### Used to manage the modes

Inside **pgAdmin 4**:
<br/>
<img width="80%" src="https://user-images.githubusercontent.com/16353807/168660500-11ed00cc-9167-4189-8163-ba306ff08116.png">

Python schema class:

```python3
class ModeCreate(BaseModel):
    pid: str
    title: str
    genre: str
    image: AnyUrl
    difficulty: Optional[int] = Field(..., gt=1, le=3) # Any difficulty from 1 to 3
```