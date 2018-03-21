from flask import Flask
from dbcred import get_con_str
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import scoped_session, sessionmaker
#import flask.ext.restless
import flask_restless 



app = Flask(__name__)
con_str = get_con_str()
#engine = create_engine('mysql://pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com')
engine = create_engine(con_str, convert_unicode=True)
#connection = engine.raw_connection()
#working_df.to_sql('data', connection, index=False, if_exists=append)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)

Base = declarative_base()
Base.metadata.bind = engine

def get_con_str():
    return "mysql+pymysql://PT_Admin:cookies123@pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com:3306/poptopic_db"

class Movies(Base):
    __tablename__ = 'movies'
    movie_id = Column(Unicode(25), primary_key=True) 
    movie_name = Column(String(100))
    description = Column(Text)
    release_date = Column(String(15))
    poster_url = Column(String(250))
    trailer_url = Column(String(250))
    topics = Column(Text)
    similar_books = Column(Text)
    similar_songs = Column(Text)

    '''
    GET /api/movies 
    GET /api/movies/<movie_id>
    GET /api/movies/<movie_id>/similar_books -> get list of all Book objects that are similar to Movie object with given movie_id 
    GET /api/movies/<movie_id>/similar_songs ->get list of all Song objects that are similar to Movie object with given movie_id 
    '''

class Books(Base):
    __tablename__ = 'books'
    book_id = Column(Unicode(25), primary_key=True) 
    book_name = Column(String(250))
    description = Column(Text)
    author = Column(String(50))
    release_date = Column(String(15))
    poster_url = Column(String(250))
    topics = Column(Text)
    similar_movies = Column(Text)
    similar_songs = Column(Text)

    '''
    GET /api/books
    GET /api/books/<book_id>
    GET /api/books/<book_id>/similar_movies -> get list of all Movie objects that are similar to Book object with given book_id
    GET /api/books/<book_id>/similar_songs -> get list of all Song objects that are similar to Book object with given book_id
    '''

class Songs(Base):
    __tablename__ = 'songs'
    song_id = Column(Unicode(25), primary_key=True) 
    song_name = Column(String(250))
    artists = Column(String(250)) # OR IS IT Column(Text) bc it's a json list??
    album = Column(String(250))
    poster_url = Column(String(250))
    youtube_url = Column(String(250))
    release_date = Column(String(15))
    topics = Column(Text)
    similar_movies = Column(Text)
    similar_books = Column(Text)

    '''
    GET /api/songs
    GET /api/songs/<song_id>
    GET /api/songs/<song_id>/similar_movies -> get list of all Movie objects that are similar to Song object with given song_id
    GET /api/songs/<song_id>/similar_books -> get list of all Book objects that are similar to Song object with given song_id
    '''

class Topics(Base):
    __tablename__ = 'topics'
    topic_id = Column(Unicode(25), primary_key=True) 
    topic_name = Column(String(50))
    related_movies = Column(Text)
    related_songs = Column(Text)
    related_books = Column(Text)

    '''
    GET /api/topics/<topic_id>/related_movies -> get list of all Movie objects related to this topic
    GET /api/topics/<topic_id>/related_songs -> get list of all Songs related to this topic
    GET /api/topics/<topic_id>/related_books -> get list of all Books related to this topic
    '''

# create database tables
Base.metadata.create_all()

manager = flask_restless.APIManager(app, session=mysession)

movie_blueprint = manager.create_api(Movies, methods=['GET'])
book_blueprint = manager.create_api(Books, methods=['GET'])
song_blueprint = manager.create_api(Songs, methods=['GET'])
topic_books_blueprint = manager.create_api(Topics, methods=['GET'])

