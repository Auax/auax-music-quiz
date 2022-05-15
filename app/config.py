import os

import dotenv

dotenv.load_dotenv()


class Settings:
    # APP
    development: str = os.getenv("DEVELOPMENT")
    title: str = "Auax Music Quiz"
    description: str = "A music quiz powered by FastAPI and Deezer"
    version: str = "1.0.0"

    # CORS Middleware
    allowed_origin: str = os.getenv("ALLOWED_ORIGIN")
    allow_credentials: bool = True
    allow_methods: list = ["GET", "POST", "OPTIONS"]
    allow_headers: list = ["Content-Type", "Set-Cookie", "Authorization", "X-Requested-With"]

    # Session Middleware
    app_secret_key: str = os.getenv("APP_SECRET_KEY")

    # Database Middleware
    database_uri = os.getenv("DATABASE_URL")


settings = Settings()
