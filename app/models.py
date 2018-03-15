#from sqlalchemy.ext.declarative import declarative_base, declared_attr
#from sqlalchemy import ForeignKey, Column, Integer, String, Boolean
#from sqlalchemy.orm import backref, relationship
#from automagic_api import Base

from flask import Flask
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import scoped_session, sessionmaker
import flask.ext.restless


app = Flask(__name__)
engine = create_engine('pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com', convert_unicode=True)
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

	#@app.route("/movies", subdomain="api")
	def get_movies():
	    conn = db.connect() # connect to the database
	    query = conn.execute("select * from Movies")
	    page = 1
	    if 'page' in request.args:
	        page = request.args['page']
	        
	    	result = {'movies' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
	    	return jsonify(result)
	    else:

	def get_movie_details(movie_id):
		conn = db.connect()
		query = conn.execute("select * from Movies where movie_id =%d" %int(movie_id))
		result = {'movie details' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    def movie_similar_books(movie_id):
    	conn = db.connect()
		query = conn.execute("select similar_books from Movies where movie_id =%d" %int(movie_id))
		result = {'similar books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    def movie_similar_songs(movie_id):
    	conn = db.connect()
		query = conn.execute("select similar_songs from Movies where movie_id =%d" %int(movie_id))
		result = {'similar songs' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


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

	def get_books():
		conn = db.connect()
		query = conn.execute("select * from Books")
		result = {'books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    def get_book_details(book_id):
    	conn = db.connect()
		query = conn.execute("select * from Books where book_id =%d" %int(book_id))
		result = {'books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    def book_similar_movies(book_id):
    	conn = db.connect()
		query = conn.execute("select similar_movies from Books where book_id =%d" %int(book_id))
		result = {'books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

   	def book_similar_songs(book_id):
   		conn = db.connect()
		query = conn.execute("select similar_songs from Books where book_id =%d" %int(book_id))
		result = {'books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


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

	def get_songs():
		conn = db.connect()
		query = conn.execute("select * from Songs")
		result = {'songs' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

	def get_song_details(song_id):
		conn = db.connect()
		query = conn.execute("select * from Songs where song_id =%d" %int(song_id))
		result = {'song details' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

	def song_similar_movies(song_id):
		conn = db.connect()
		query = conn.execute("select similar_movies from Songs where song_id =%d" %int(song_id))
		result = {'song details' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

	def song_similar_books(song_id):
		conn = db.connect()
		query = conn.execute("select similar_books from Songs where song_id =%d" %int(song_id))
		result = {'song details' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


class Topics(Base):
	topic_id = Column(Unicode(25), primary_key=True) 
	topic_name = Column(String(50))
	related_movies = Column(Text)
	related_songs = Column(Text)
	related_books = Column(Text)

	def topic_books(topic_id):
		conn = db.connect()
		query = conn.execute("select related_books from Topics where topic_id =%d" %int(topic_id))
		result = {'related books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    def topic_songs(topic_id):
    	conn = db.connect()
		query = conn.execute("select related_songs from Topics where topic_id =%d" %int(topic_id))
		result = {'related books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    def topic_movies(topic_id):
    	conn = db.connect()
		query = conn.execute("select related_movies from Topics where topic_id =%d" %int(topic_id))
		result = {'related books' : [dict(zip(tuple (query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


# create database tables
Base.metadata.create_all()

manager = flask.ext.restless.APIManager(app, session=mysession)

movie_blueprint = manager.create_api(Movies, methods=['GET'], include_methods=['get_movies'])
movie_details_blueprint = manager.create_api(Movies, methods=['GET'], include_methods=['get_movie_details'])
movie_similar_books_blueprint = manager.create_api(Movies, methods=['GET'], include_methods=['movie_similar_books'])
movie_similar_songs_blueprint = manager.create_api(Movies, methods=['GET'], include_methods=['movie_similar_songs'])

book_blueprint = manager.create_api(Books, methods=['GET'], include_methods=['get_books'])
book_details_blueprint = manager.create_api(Books, methods=['GET'], include_methods=['get_book_details'])
book_similar_movies_blueprint = manager.create_api(Books, methods=['GET'], include_methods=['book_similar_movies'])
book_similar_songs_blueprint = manager.create_api(Books, methods=['GET'], include_methods=['book_similar_songs'])

song_blueprint = manager.create_api(Songs, methods=['GET'], include_methods=['get_songs'])
song_details_blueprint = manager.create_api(Songs, methods=['GET'], include_methods=['get_song_details'])
song_similar_movies_blueprint = manager.create_api(Songs, methods=['GET'], include_methods=['song_similar_movies'])
song_similar_books_blueprint = manager.create_api(Songs, methods=['GET'], include_methods=['song_similar_books'])

topic_books_blueprint = manager.create_api(Topics, methods=['GET'], include_methods=['topic_books'])
topic_songs_blueprint = manager.create_api(Topics, methods=['GET'], include_methods=['topic_songs'])
topic_movies_blueprint = manager.create_api(Topics, methods=['GET'], include_methods=['topic_movies'])




