from connector import Base, connect_tcp_socket
from question_model import *
from sqlalchemy import MetaData

engine = connect_tcp_socket().connect()
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)
