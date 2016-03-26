from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


Base = declarative_base()

engine = create_engine('mysql://car:dealership@localhost/car_dealership')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
