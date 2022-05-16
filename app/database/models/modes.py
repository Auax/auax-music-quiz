from sqlalchemy import Column, Integer, String

from app.database.base_class import Base


# Class name will be the table name in the db
class Modes(Base):
    id = Column(Integer, primary_key=True, index=True)
    pid = Column(String, nullable=False)
    title = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    image = Column(String, nullable=False)
    difficulty = Column(Integer)
