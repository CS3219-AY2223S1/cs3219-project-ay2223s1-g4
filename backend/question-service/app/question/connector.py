import os
import pprint
import sqlalchemy
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# # enter your server IP address/domain name
# HOST = "x.x.x.x" # or "domain.com"
# # database name, if you want just to connect to MySQL server, leave it empty
# DATABASE = "test"
# # this is the user you create
# USER = "user1"
# # user password
# PASSWORD = "password"
# # connect to MySQL server
# db_connection = mysql.connect(host=HOST, database=DATABASE, user=USER, password=PASSWORD)
# print("Connected to:", db_connection.get_server_info())
#
# connect_tcp_socket initializes a TCP connection pool
# for a Cloud SQL instance of MySQL.

load_dotenv()

def connect_tcp_socket() -> sqlalchemy.engine.base.Engine:
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.
    db_host = os.environ["DB_HOST"]  # e.g. '127.0.0.1' ('172.17.0.1' if deployed to GAE Flex)
    db_user = os.environ["DB_USER"]  # e.g. 'my-db-user'
    db_pass = os.environ["DB_PASS"]  # e.g. 'my-db-password'
    db_name = os.environ["DB_NAME"]  # e.g. 'my-database'
    db_port = int(os.environ["DB_PORT"])  # e.g. 3306

    # Equivalent URL:
    # mysql+pymysql://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
    connection_str = sqlalchemy.engine.url.URL.create(
        drivername="mysql+pymysql",
        username=db_user,
        password=db_pass,
        host=db_host,
        port=db_port,
        database=db_name,
    )
    print(f"[LOG] Connecting to {connection_str}")
    pool = sqlalchemy.create_engine(
        connection_str,
        pool_pre_ping=True
    )
    return pool

def createSession():
    return sessionmaker(autocommit=False, autoflush=True, bind=connect_tcp_socket())

Base = declarative_base()

if __name__ == "__main__":
    connect = connect_tcp_socket()
    print(connect.connect())
