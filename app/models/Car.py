from sqlalchemy import Column, Integer, String
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship
from ..db import Base
from .Dealership import association_table


class Car(Base):

    __tablename__ = 'car'

    id = Column(Integer, primary_key=True)
    brand = Column(String(30))
    model = Column(String(30))
    license_plate = Column(String(15))
    color = Column(String(20))
    mileage = Column(Integer)
    fuel = Column(String(20))
    price = Column(Integer)
    year = Column(Integer)
    owner_id = Column(Integer, ForeignKey('owner.id'))

    owner = relationship('Owner')
    dealership = relationship(
        'Dealership', secondary=association_table, lazy='dynamic')
