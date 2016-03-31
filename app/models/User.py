from sqlalchemy import Column, Integer, String
from ..db import Base


class User(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(50), unique=True)
    password = Column(String(50), nullable=False)
    contact = Column(String(20), nullable=False)
    user_type = Column(String(10), nullable=False)
    __mapper_args__ = {'polymorphic_on': user_type}
