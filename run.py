import uvicorn

from api.routes import app


def setup():
    import dotenv
    import os
    dotenv.load_dotenv()
    with open("token_cache", "w") as file:
        file.write(os.getenv("AUTH_CACHE"))


if __name__ == "__main__":
    setup()
    uvicorn.run(app, port=8000)
