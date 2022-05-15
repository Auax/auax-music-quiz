import uvicorn

from app.database.base import Base
from app.database.session import engine
from app.routes import app

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    uvicorn.run(app, port=8000)
