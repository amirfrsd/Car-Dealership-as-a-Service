from sqlalchemy import Column, Integer, String
from ..db import Base

class Client(Base):

    __tablename__ = 'client'

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(50), unique=True)
    password = Column(String(50), nullable=False)
    contact = Column(String(20))
