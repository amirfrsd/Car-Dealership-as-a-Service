from sqlalchemy import Column
from .User import User
from sqlalchemy.sql.schema import ForeignKey


class Client(User):

    __tablename__ = 'client'

    id = Column(None, ForeignKey('user.id'), primary_key=True)
    __mapper_args__ = {'polymorphic_identity': 'client'}
