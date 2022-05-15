from pydantic import BaseModel, AnyUrl


class ModeCreate(BaseModel):
    pid: str
    title: str
    genre: str
    image: AnyUrl
