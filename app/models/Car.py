from sqlalchemy import Column, Integer, String
from ..db import Base
from sqlalchemy.sql.schema import ForeignKey


class Car(Base):

    __tablename__ = 'car'

    id = Column(Integer, primary_key=True)
    brand = Column(String(30), nullable=False)
    model = Column(String(30), nullable=False)
    license_plate = Column(String(15), nullable=False)
    color = Column(String(20), nullable=False)
    mileage = Column(Integer, nullable=False)
    fuel = Column(String(20), nullable=False)
    price = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    owner_id = Column(Integer, ForeignKey('owner.id'))
    dealership_id = Column(Integer, ForeignKey('dealership.id'))
