from sqlalchemy import Column, Integer, String
from ..db import Base
from sqlalchemy.orm import relationship
from .Dealership import Dealership

class Owner(Base):

    __tablename__ = 'owner'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(50), nullable=False)
    contact = Column(Integer)
    dealerships = relationship('Dealership', backref='owner', lazy='dynamic')
    cars = relationship('Car', backref='owner', lazy='dynamic')
