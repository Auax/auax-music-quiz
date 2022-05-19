from typing import Optional

from pydantic import BaseModel, AnyUrl, Field


class ModeCreate(BaseModel):
    pid: str
    title: str
    genre: str
    image: AnyUrl
    difficulty: Optional[int] = Field(..., gt=0, le=3)
