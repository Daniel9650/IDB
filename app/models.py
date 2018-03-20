#from sqlalchemy.ext.declarative import declarative_base, declared_attr
#from sqlalchemy import ForeignKey, Column, Integer, String, Boolean
#from sqlalchemy.orm import backref, relationship
#from automagic_api import Base

import requests
import json

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy import inspect
import random
import hashlib
from dbcred import get_con_str
from flask import Flask
from dbcred import get_con_str
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import scoped_session, sessionmaker
#import flask.ext.restless

def create_session():
    # an Engine, which the Session will use for connection resources
    con_str = ret_con_str()
    engine = create_engine(con_str)

    # create a configured "Session" class
    Session = sessionmaker(bind=engine)

    # create a Session
    return Session()

def ret_con_str():
    return "mysql+pymysql://PT_Admin:cookies123@pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com:3306/poptopic_db"