from sqlalchemy import Column, Integer, String
from ..db import Base
from werkzeug.security import generate_password_hash, check_password_hash


class User(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(50), unique=True)
    password_hash = Column(String(128), nullable=False)
    contact = Column(String(20))
    img = Column(String(128))
    user_type = Column(String(10), nullable=False)
    __mapper_args__ = {'polymorphic_on': user_type}

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
