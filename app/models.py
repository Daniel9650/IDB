#from sqlalchemy.ext.declarative import declarative_base, declared_attr
#from sqlalchemy import ForeignKey, Column, Integer, String, Boolean
#from sqlalchemy.orm import backref, relationship
#from automagic_api import Base

from flask import Flask
from dbcred import get_con_str
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import scoped_session, sessionmaker
import flask.ext.restless


app = Flask(__name__)
con_str = get_con_str
engine = create_engine('mysql://pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com', convert_unicode=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)

Base = declarative_base()
Base.metadata.bind = engine

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

manager = flask.ext.restless.APIManager(app, session=mysession)

movie_blueprint = manager.create_api(Movies, methods=['GET'])
#movie_similar_books_blueprint = manager.create_api(Movies, methods=['GET'], include_columns=['similar_books'])
#movie_similar_songs_blueprint = manager.create_api(Movies, methods=['GET'], include_columns=['similar_songs'])

book_blueprint = manager.create_api(Books, methods=['GET'])
#book_similar_movies_blueprint = manager.create_api(Books, methods=['GET'], include_columns=['similar_movies'])
#book_similar_songs_blueprint = manager.create_api(Books, methods=['GET'], include_columns=['similar_songs'])

song_blueprint = manager.create_api(Songs, methods=['GET'])
#song_similar_movies_blueprint = manager.create_api(Songs, methods=['GET'], include_columns=['similar_movies'])
#song_similar_books_blueprint = manager.create_api(Songs, methods=['GET'], include_columns=['similar_books'])

topic_books_blueprint = manager.create_api(Topics, methods=['GET'])
#topic_songs_blueprint = manager.create_api(Topics, methods=['GET'], include_columns=['related_songs'])
#topic_movies_blueprint = manager.create_api(Topics, methods=['GET'], include_columns=['related_movies'])


