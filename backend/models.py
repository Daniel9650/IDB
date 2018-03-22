from flask import Flask, redirect
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import scoped_session, sessionmaker
#import flask.ext.restless
import flask_restless 

Base = declarative_base()

class Movies(Base):
    __tablename__ = 'Movies'

    movie_id = Column(String(), primary_key=True)
    movie_name = Column(String())
    description = Column(String())
    release_date = Column(String())
    poster_url = Column(String())
    trailer_url = Column(String())
    topics = Column(String())
    similar_books = Column(String())
    similar_songs = Column(String())

    def __init__(self, movie):
        self.movie_id = movie.id
        self.movie_name = remove_non_ascii(movie.name)
        self.description = remove_non_ascii(movie.description)
        self.release_date = movie.release
        self.poster_url = movie.poster_url
        self.trailer_url = movie.trailer_url.split("?v=").pop()
        self.topics = json.dumps(movie.topics)
        self.similar_books = json.dumps(movie.similar_books)
        self.similar_songs = json.dumps(movie.similar_songs)

    '''
    GET /api/movies 
    GET /api/movies/<movie_id>
    GET /api/movies/<movie_id>/similar_books -> get list of all Book objects that are similar to Movie object with given movie_id 
    GET /api/movies/<movie_id>/similar_songs ->get list of all Song objects that are similar to Movie object with given movie_id 
    '''

class Books(Base):
    __tablename__ = "Books"

    book_id = Column(String(), primary_key=True)
    book_name = Column(String())
    description = Column(String())
    authors = Column(String())
    release_date = Column(String())
    poster_url = Column(String())
    topics = Column(String())
    similar_movies = Column(String())
    similar_songs = Column(String())

    def __init__(self, book):
        self.book_id = book.id
        self.book_name = remove_non_ascii(book.name)
        self.description = remove_non_ascii(book.description)
        self.authors = remove_non_ascii(json.dumps(book.authors))
        self.release_date = book.release
        self.poster_url = book.poster_url
        self.topics = json.dumps(book.topics)
        self.similar_movies = json.dumps(book.similar_movies)
        self.similar_songs = json.dumps(book.similar_songs)

    '''
    GET /api/books
    GET /api/books/<book_id>
    GET /api/books/<book_id>/similar_movies -> get list of all Movie objects that are similar to Book object with given book_id
    GET /api/books/<book_id>/similar_songs -> get list of all Song objects that are similar to Book object with given book_id
    '''

class Songs(Base):
    __tablename__ = "Songs"

    song_id = Column(String(), primary_key=True)
    song_name = Column(String())
    artists = Column(String())
    album = Column(String())
    poster_url = Column(String())
    youtube_url = Column(String())
    release_date = Column(String())
    topics = Column(String())
    similar_movies = Column(String())
    similar_books = Column(String())

    def __init__(self, song):
        self.song_id = song.id
        self.song_name = remove_non_ascii(song.name)
        self.artists = remove_non_ascii(json.dumps(song.artists))
        self.album = remove_non_ascii(song.album)
        self.poster_url = song.poster_url
        self.youtube_url = song.youtube_url
        self.release_date = song.release
        self.topics = json.dumps(song.topics)
        self.similar_movies = json.dumps(song.similar_movies)
        self.similar_books = json.dumps(song.similar_books)

    '''
    GET /api/songs
    GET /api/songs/<song_id>
    GET /api/songs/<song_id>/similar_movies -> get list of all Movie objects that are similar to Song object with given song_id
    GET /api/songs/<song_id>/similar_books -> get list of all Book objects that are similar to Song object with given song_id
    '''

class Topics(Base):
    __tablename__ = "Topics"

    topic_id = Column(String(), primary_key=True)
    topic_name = Column(String())
    related_movies = Column(String())
    related_songs = Column(String())
    related_books = Column(String())
    poster_url = Column(String())

    def __init__(self, topic_name, movies, books, songs):
        self.topic_id = TopicEntity.get_topic_id(topic_name)
        self.topic_name = topic_name
        self.related_movies = json.dumps(movies)
        self.related_books = json.dumps(books)
        self.related_songs = json.dumps(songs)


    '''
    GET /api/topics/<topic_id>/related_movies -> get list of all Movie objects related to this topic
    GET /api/topics/<topic_id>/related_songs -> get list of all Songs related to this topic
    GET /api/topics/<topic_id>/related_books -> get list of all Books related to this topic
    '''

app = Flask(__name__)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return redirect("http://api.poptopic.org", code=302)

@app.route('/api/<model_name>/<model_id>/<model_attribute>')
def api_index(model_name, model_id, model_attribute):
    #session = create_session()
    #q = session.query(eval(model_name))
    return 'hello'
    #return session[model_name]


def get_con_str():
    return "mysql+pymysql://PT_Admin:cookies123@pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com:3306/poptopic_db"
    #return "mysql+pymysql://root:admin@localhost:3306/poptopic_db"

con_str = get_con_str()
engine = create_engine(con_str, convert_unicode=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)


Base.metadata.bind = engine



# create database tables
Base.metadata.create_all(engine)

manager = flask_restless.APIManager(app, session=mysession)
#manager.init_app(app)

movie_blueprint = manager.create_api(Movies, methods=['GET'])
book_blueprint = manager.create_api(Books, methods=['GET'])
song_blueprint = manager.create_api(Songs, methods=['GET'])
topic_books_blueprint = manager.create_api(Topics, methods=['GET'])

if __name__ == "__main__":
    app.run()

