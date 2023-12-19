import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from db.database_schemas import Base

load_dotenv()

connection_string = os.getenv('DATABASE_URL')
engine = create_engine(connection_string)

# Create all tables
Base.metadata.create_all(engine)

# import this in endpoints and use in a "with" context to handle .commit and .close automatically
DB_Session = sessionmaker(engine)
