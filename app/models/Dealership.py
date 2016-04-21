from sqlalchemy import Column, Integer, String, Table
from ..db import Base
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship


association_table = Table('car_dealership', Base.metadata,
                          Column(
                              'car_id', Integer, ForeignKey('car.id')),
                          Column(
                              'dealership_id', Integer, ForeignKey('dealership.id'))
                          )


class Dealership(Base):

    __tablename__ = 'dealership'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    contact = Column(String(20), nullable=False)
    location = Column(String(20), nullable=False)
    owner_id = Column(Integer, ForeignKey('owner.id'))

    owner = relationship('Owner')
    cars = relationship(
        'Dealership', secondary=association_table, lazy='dynamic')
