from sqlalchemy import Column, Integer, String
from ..db import Base
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship


class Dealership(Base):

    __tablename__ = 'dealership'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    contact = Column(String(20), nullable=False)
    location = Column(String(20), nullable=False)
    owner_id = Column(Integer, ForeignKey('owner.id'))

    owner = relationship('Owner')
    cars = relationship('Car', backref='dealership', lazy='dynamic')
