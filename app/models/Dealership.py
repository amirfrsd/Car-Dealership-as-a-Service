from sqlalchemy import Column, Integer, String
from ..db import Base
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship
from .Car import Car


class Dealership(Base):

    __tablename__ = 'dealership'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    contact = Column(Integer, nullable=False)
    location = Column(String(100), nullable=False)
    owner_id = Column(Integer, ForeignKey('owner.id'))
    cars = relationship('Car', backref='dealership', lazy='dynamic')
