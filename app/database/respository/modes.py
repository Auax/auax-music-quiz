from sqlalchemy.orm import Session

from app.database.schemas.modes import ModeCreate
from app.database.models.modes import Modes


def create_new_mode(mode: ModeCreate, db: Session):
    mode = Modes(pid=mode.pid, title=mode.title, image=mode.image, genre=mode.genre, difficulty=mode.difficulty)  # noqa
    db.add(mode)
    db.commit()
    db.refresh(mode)
    return mode
