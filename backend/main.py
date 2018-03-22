import os
import ast
import json
from flask import Flask, redirect, jsonify, abort, request, send_from_directory, render_template, url_for, Blueprint
from GitInfo import get_commits_count, get_issues_count
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from math import ceil
from flask_cors import CORS

app = Flask(__name__, template_folder='.', static_folder='static')
app.config['SERVER_NAME'] = 'poptopic.org'
app.url_map.strict_slashes = False
CORS(app)
api = Blueprint('api', 'api', subdomain='api')

con_str = "mysql+pymysql://PT_Admin:cookies123@pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com:3306/poptopic_db"
engine = create_engine(con_str, convert_unicode=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)
Base = declarative_base()
Base.metadata.bind = engine

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
        self.trailer_url = movie.trailer_url
        self.topics = json.dumps(movie.topics)
        self.similar_books = json.dumps(movie.similar_books)
        self.similar_songs = json.dumps(movie.similar_songs)

    def get_col(self, attr):
        data = None
        try:
            data = ast.literal_eval(getattr(self,attr))
        except:
            try:
                data = getattr(self, attr)
            except:
                data = None
        return data

    def as_dict(self):
       return {c.name: self.get_col(c.name) for c in self.__table__.columns}

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

    def get_col(self, attr):
        data = None
        try:
            data = ast.literal_eval(getattr(self,attr))
        except:
            try:
                data = getattr(self, attr)
            except:
                data = None
        return data

    def as_dict(self):
       return {c.name: self.get_col(c.name) for c in self.__table__.columns}

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

    def get_col(self, attr):
        data = None
        try:
            data = ast.literal_eval(getattr(self,attr))
        except:
            try:
                data = getattr(self, attr)
            except:
                data = None
        return data

    def as_dict(self):
       return {c.name: self.get_col(c.name) for c in self.__table__.columns}

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
    similar_movies = Column(String())
    similar_songs = Column(String())
    similar_books = Column(String())
    poster_url = Column(String())

    def __init__(self, topic_name, movies, books, songs):
        self.topic_id = TopicEntity.get_topic_id(topic_name)
        self.topic_name = topic_name
        self.similar_movies = json.dumps(movies)
        self.similar_books = json.dumps(books)
        self.similar_songs = json.dumps(songs)

    def get_col(self, attr):
        data = None
        try:
            data = ast.literal_eval(getattr(self,attr))
        except:
            try:
                data = getattr(self, attr)
            except:
                data = None
        return data

    def as_dict(self):
       return {c.name: self.get_col(c.name) for c in self.__table__.columns}

    '''
    GET /api/topics/<topic_id>/similar_movies -> get list of all Movie objects related to this topic
    GET /api/topics/<topic_id>/similar_songs -> get list of all Songs related to this topic
    GET /api/topics/<topic_id>/similar_books -> get list of all Books related to this topic
    '''

# create database tables
Base.metadata.create_all(engine)
default_items_per_page = 8
default_items_per_instance_page = 3

# Splash page
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def app_index(path):
    return render_template("index.html")

@api.before_request
def clear_trailing():
    rp = request.full_path.split("?")
    if rp[0] != '/' and rp[0].endswith('/'):
        if(len(rp) > 1):
            return redirect(rp[0][:-1] + "?" + rp[1])
        else:
            return redirect(rp[0][:-1])

@api.route('/')
def api_index():
    return redirect("http://poptopic.org/api", code=302)

@api.route('/movies/', defaults={'path': ''})
@api.route("/movies/<path:path>", methods=['GET'])
def get_movies(path):
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    items_per_page_request = request.args.get('items_per_page')
    movie_id = ""
    if(num_params > 0 and len(params[0]) > 0):
        movie_id = params[0]
    if(movie_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        min_instance = 1 + items_per_page * (page - 1)
        max_instance = (items_per_page + 1) + items_per_page * (page - 1)
        num_rows = mysession.query(Movies).count()
        max_pages = int(ceil(num_rows/items_per_page))
        num_results = 0
        page_return = {"num_results": num_results, "objects": [], "page": page, "total_pages": max_pages}
        for instance in mysession.query(Movies).order_by(Movies.movie_name)[min_instance:max_instance]:
            page_return["num_results"] += 1
            page_return["objects"].append(instance.as_dict())
        return jsonify(page_return)
    else:
        attr_focus = ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        instance = mysession.query(Movies).filter(Movies.movie_id == movie_id).first()
        if(num_params > 1 and len(params[1]) > 0):
            attr_focus = params[1]
        if(attr_focus == "" and instance != None):
            return jsonify(instance.as_dict())
        if(attr_focus != "" and instance != None):
            attr_object = instance.get_col(attr_focus)
            if(attr_focus == "similar_books" or attr_focus == "similar_songs"):
                min_instance = 0 + items_per_page * (page - 1)
                max_instance = items_per_page + items_per_page * (page - 1)
                num_related = len(attr_object)
                max_pages = int(ceil(num_related/items_per_page))
                page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
                for i in attr_object[min_instance:max_instance]:
                    page_return["num_results"] += 1
                    related_obj = mysession.query(Books).filter(Books.book_id == i).first() if (attr_focus == "similar_books") else mysession.query(Songs).filter(Songs.song_id == i).first()
                    page_return["objects"].append(related_obj.as_dict())
                return jsonify(page_return)
            if(attr_object != None):
                return jsonify(attr_object)
        abort(404)

@api.route('/songs/', defaults={'path': ''})
@api.route("/songs/<path:path>", methods=['GET'])
def get_songs(path):
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    items_per_page_request = request.args.get('items_per_page')
    song_id = ""
    if(num_params > 0 and len(params[0]) > 0):
        song_id = params[0]
    if(song_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        min_instance = 1 + items_per_page * (page - 1)
        max_instance = (items_per_page + 1) + items_per_page * (page - 1)
        num_rows = mysession.query(Songs).count()
        max_pages = int(ceil(num_rows/items_per_page))
        num_results = 0
        page_return = {"num_results": num_results, "objects": [], "page": page, "total_pages": max_pages}
        for instance in mysession.query(Songs).order_by(Songs.song_name)[min_instance:max_instance]:
            page_return["num_results"] += 1
            page_return["objects"].append(instance.as_dict())
        return jsonify(page_return)
    else:
        attr_focus = ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        instance = mysession.query(Songs).filter(Songs.song_id == song_id).first()
        if(num_params > 1 and len(params[1]) > 0):
            attr_focus = params[1]
        if(attr_focus == "" and instance != None):
            return jsonify(instance.as_dict())
        if(attr_focus != "" and instance != None):
            attr_object = instance.get_col(attr_focus)
            if(attr_focus == "similar_books" or attr_focus == "similar_movies"):
                min_instance = 0 + items_per_page * (page - 1)
                max_instance = items_per_page + items_per_page * (page - 1)
                num_related = len(attr_object)
                max_pages = int(ceil(num_related/items_per_page))
                page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
                for i in attr_object[min_instance:max_instance]:
                    page_return["num_results"] += 1
                    related_obj = mysession.query(Books).filter(Books.book_id == i).first() if (attr_focus == "similar_books") else mysession.query(Movies).filter(Movies.movie_id == i).first()
                    page_return["objects"].append(related_obj.as_dict())
                return jsonify(page_return)
            if(attr_object != None):
                return jsonify(attr_object)
        abort(404)

@api.route('/books/', defaults={'path': ''})
@api.route("/books/<path:path>", methods=['GET'])
def get_books(path):
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    items_per_page_request = request.args.get('items_per_page')
    book_id = ""
    if(num_params > 0 and len(params[0]) > 0):
        book_id = params[0]
    if(book_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        min_instance = 1 + items_per_page * (page - 1)
        max_instance = (items_per_page + 1) + items_per_page * (page - 1)
        num_rows = mysession.query(Books).count()
        max_pages = int(ceil(num_rows/items_per_page))
        num_results = 0
        page_return = {"num_results": num_results, "objects": [], "page": page, "total_pages": max_pages}
        for instance in mysession.query(Books).order_by(Books.book_id)[min_instance:max_instance]:
            page_return["num_results"] += 1
            page_return["objects"].append(instance.as_dict())
        return jsonify(page_return)
    else:
        attr_focus = ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        instance = mysession.query(Books).filter(Books.book_id == book_id).first()
        if(num_params > 1 and len(params[1]) > 0):
            attr_focus = params[1]
        if(attr_focus == "" and instance != None):
            return jsonify(instance.as_dict())
        if(attr_focus != "" and instance != None):
            attr_object = instance.get_col(attr_focus)
            if(attr_focus == "similar_songs" or attr_focus == "similar_movies"):
                min_instance = 0 + items_per_page * (page - 1)
                max_instance = items_per_page + items_per_page * (page - 1)
                num_related = len(attr_object)
                max_pages = int(ceil(num_related/items_per_page))
                page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
                for i in attr_object[min_instance:max_instance]:
                    page_return["num_results"] += 1
                    related_obj = mysession.query(Songs).filter(Songs.song_id == i).first() if (attr_focus == "similar_songs") else mysession.query(Movies).filter(Movies.movie_id == i).first()
                    page_return["objects"].append(related_obj.as_dict())
                return jsonify(page_return)
            if(attr_object != None):
                return jsonify(attr_object)
        abort(404)

@api.route('/topics/', defaults={'path': ''})
@api.route("/topics/<path:path>", methods=['GET'])
def get_topics(path):
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    items_per_page_request = request.args.get('items_per_page')
    topic_id = ""
    if(num_params > 0 and len(params[0]) > 0):
        topic_id = params[0]
    if(topic_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        min_instance = 1 + items_per_page * (page - 1)
        max_instance = (items_per_page + 1) + items_per_page * (page - 1)
        num_rows = mysession.query(Topics).count()
        max_pages = int(ceil(num_rows/items_per_page))
        num_results = 0
        page_return = {"num_results": num_results, "objects": [], "page": page, "total_pages": max_pages}
        for instance in mysession.query(Topics).order_by(Topics.topic_id)[min_instance:max_instance]:
            page_return["num_results"] += 1
            page_return["objects"].append(instance.as_dict())
        return jsonify(page_return)
    else:
        attr_focus = ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "alpha" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        instance = mysession.query(Topics).filter(Topics.topic_id == topic_id).first()
        if(num_params > 1 and len(params[1]) > 0):
            attr_focus = params[1]
        if(attr_focus == "" and instance != None):
            return jsonify(instance.as_dict())
        if(attr_focus != "" and instance != None):
            attr_object = instance.get_col(attr_focus)
            if(attr_focus == "similar_songs" or attr_focus == "similar_movies" or attr_focus == "similar_books"):
                min_instance = 0 + items_per_page * (page - 1)
                max_instance = items_per_page + items_per_page * (page - 1)
                num_related = len(attr_object)
                max_pages = int(ceil(num_related/items_per_page))
                page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
                for i in attr_object[min_instance:max_instance]:
                    page_return["num_results"] += 1
                    related_obj = None
                    if(attr_focus == "similar_songs"):
                        related_obj = mysession.query(Songs).filter(Songs.song_id == i).first()
                    if(attr_focus == "similar_books"):
                        related_obj = mysession.query(Books).filter(Books.book_id == i).first()
                    if(attr_focus == "similar_movies"):
                        related_obj = mysession.query(Movies).filter(Movies.movie_id == i).first()
                    page_return["objects"].append(related_obj.as_dict())
                return jsonify(page_return)
            if(attr_object != None):
                return jsonify(attr_object)
        abort(404)

app.register_blueprint(api)

if __name__ == "__main__":
    app.run()
