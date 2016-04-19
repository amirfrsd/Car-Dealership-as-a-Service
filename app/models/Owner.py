from sqlalchemy import Column
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship
from .User import User


class Owner(User):

    __tablename__ = 'owner'

    id = Column(None, ForeignKey('user.id'), primary_key=True)
    __mapper_args__ = {'polymorphic_identity': 'owner'}

    dealerships = relationship(
        'Dealership', backref='dealership_owner', lazy='dynamic')
    cars = relationship('Car', backref='car_owner', lazy='dynamic')
