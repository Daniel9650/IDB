import os
import ast
import json
from flask import Flask, redirect, jsonify, abort, request, send_from_directory, render_template, url_for, Blueprint
from GitInfo import get_counts
from sqlalchemy import Column, String, Integer, Text, Unicode, ForeignKey
from sqlalchemy import create_engine, and_, or_, desc, asc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from math import ceil
from cred import getUser
from flask_cors import CORS

app = Flask(__name__, template_folder='.', static_folder='static')
app.config['SERVER_NAME'] = 'poptopic.org'
app.url_map.strict_slashes = False
CORS(app)
api = Blueprint('api', 'api', subdomain='api')

con_str = "mysql+pymysql://"+getUser()+"@pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com:3306/poptopic_db"
engine = create_engine(con_str, convert_unicode=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
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
    director = Column(String())
    cast = Column(String())

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
        self.director = remove_non_ascii(movie.description)
        self.cast = remove_non_ascii(json.dumps(movie.cast))

    def as_dict(self):
        model_dict = {
            "movie_id": self.movie_id,
            "movie_name": self.movie_name,
            "director": self.director,
            "cast": ast.literal_eval(self.cast),
            "description": self.description,
            "release_date": self.release_date,
            "poster_url": self.poster_url,
            "trailer_url": self.trailer_url,
            "topics": ast.literal_eval(self.topics),
            "similar_books": ast.literal_eval(self.similar_books),
            "similar_songs": ast.literal_eval(self.similar_songs)
        }
        return model_dict

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

    def as_dict(self):
        model_dict = {
            "book_id": self.book_id,
            "book_name": self.book_name,
            "description": self.description,
            "authors": ast.literal_eval(self.authors),
            "release_date": self.release_date,
            "poster_url": self.poster_url,
            "topics": ast.literal_eval(self.topics),
            "similar_movies": ast.literal_eval(self.similar_movies),
            "similar_songs": ast.literal_eval(self.similar_songs)
        }
        return model_dict

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

    def as_dict(self):
        model_dict = {
            "song_id": self.song_id,
            "song_name": self.song_name,
            "artists": ast.literal_eval(self.artists),
            "album": self.album,
            "poster_url": self.poster_url,
            "youtube_url": self.youtube_url,
            "release_date": self.release_date,
            "topics": ast.literal_eval(self.topics),
            "similar_movies": ast.literal_eval(self.similar_movies),
            "similar_books": ast.literal_eval(self.similar_books)
        }
        return model_dict

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

    def as_dict(self):
        model_dict = {
            "topic_id": self.topic_id,
            "topic_name": self.topic_name,
            "similar_movies": ast.literal_eval(self.similar_movies),
            "similar_songs": ast.literal_eval(self.similar_songs),
            "similar_books": ast.literal_eval(self.similar_books),
            "poster_url": self.poster_url
        }
        return model_dict

    '''
    GET /api/topics/<topic_id>/similar_movies -> get list of all Movie objects related to this topic
    GET /api/topics/<topic_id>/similar_songs -> get list of all Songs related to this topic
    GET /api/topics/<topic_id>/similar_books -> get list of all Books related to this topic
    '''

# create database tables
Base.metadata.create_all(engine)
default_items_per_page = 9
default_items_per_instance_page = 3
movie_sorts = {
    "release_year_asc": ["release_date", "asc"],
    "release_year_desc": ["release_date", "desc"],
    "title_asc": ["movie_name","asc"],
    "title_desc": ["movie_name","desc"]
}
song_sorts = {
    "release_year_asc": ["release_date", "asc"],
    "artist_asc": ["artists", "asc"],
    "artist_desc": ["artists","desc"],
    "title_asc": ["song_name", "asc"],
    "title_desc":["song_name", "desc"]
}
book_sorts = {
    "author_asc": ["authors","asc"],
    "author_desc": ["authors", "desc"],
    "title_asc":["book_name","asc"],
    "title_desc":["book_name", "desc"],
    "release_year_asc":["release_date","asc"]
}
topics_sorts = {
    "title_asc":["topic_name", "asc"],
    "title_desc":["topic_name", "desc"]
}

def get_similar_books(mysession, attr_object, page, sort, items_per_page, query_request, filter_request):
    filter_request = ["book_name"] if (len(filter_request) <= 0) else filter_request
    min_instance = items_per_page * (page - 1)
    max_instance = items_per_page * page
    sort_col = getattr(Books, book_sorts[sort][0])
    sort_func = getattr(Column, book_sorts[sort][1])
    query = mysession.query(Books).filter(Books.book_id.in_(attr_object)).order_by(sort_func(sort_col))
    try:
        if(len(query_request) >= 1):
            if(len(query_request) == len(filter_request)):
                for i,f in enumerate(filter_request):
                    query = query.filter(getattr(Books, f).like("%"+query_request[i]+"%"))
            else:
                abort(400)
    except:
        abort(400)
    num_related = query.count()
    max_pages = max(int(ceil(num_related/items_per_page)),1)
    page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
    for instance in query[min_instance:max_instance]:
        page_return["num_results"] += 1
        page_return["objects"].append(instance.as_dict())
    return jsonify(page_return)

def get_similar_songs(mysession, attr_object, page, sort, items_per_page, query_request, filter_request):
    filter_request = ["song_name"] if (len(filter_request) <= 0) else filter_request
    min_instance = items_per_page * (page - 1)
    max_instance = items_per_page * page
    sort_col = getattr(Songs, song_sorts[sort][0])
    sort_func = getattr(Column, song_sorts[sort][1])
    query = mysession.query(Songs).filter(Songs.song_id.in_(attr_object)).order_by(sort_func(sort_col))
    try:
        if(len(query_request) >= 1):
            if(len(query_request) == len(filter_request)):
                for i,f in enumerate(filter_request):
                    query = query.filter(getattr(Songs, f).like("%"+query_request[i]+"%"))
            else:
                abort(400)
    except:
        abort(400)
    num_related = query.count()
    max_pages = max(int(ceil(num_related/items_per_page)),1)
    page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
    for instance in query[min_instance:max_instance]:
        page_return["num_results"] += 1
        page_return["objects"].append(instance.as_dict())
    return jsonify(page_return)

def get_similar_movies(mysession, attr_object, page, sort, items_per_page, query_request, filter_request):
    filter_request = ["movie_name"] if (len(filter_request) <= 0) else filter_request
    min_instance = items_per_page * (page - 1)
    max_instance = items_per_page * page
    sort_col = getattr(Movies, movie_sorts[sort][0])
    sort_func = getattr(Column, movie_sorts[sort][1])
    query = mysession.query(Movies).filter(Movies.movie_id.in_(attr_object)).order_by(sort_func(sort_col))
    try:
        if(len(query_request) >= 1):
            if(len(query_request) == len(filter_request)):
                for i,f in enumerate(filter_request):
                    query = query.filter(getattr(Movies, f).like("%"+query_request[i]+"%"))
            else:
                abort(400)
    except:
        abort(400)
    num_related = query.count()
    max_pages = max(int(ceil(num_related/items_per_page)),1)
    page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
    for instance in query[min_instance:max_instance]:
        page_return["num_results"] += 1
        page_return["objects"].append(instance.as_dict())
    return jsonify(page_return)

def get_instance_topics(mysession, attr_object, page, sort, items_per_page, query_request, filter_request):
    filter_request = ["topic_name"] if (len(filter_request) <= 0) else filter_request
    min_instance = items_per_page * (page - 1)
    max_instance = items_per_page * page
    sort_col = getattr(Topics, topics_sorts[sort][0])
    sort_func = getattr(Column, topics_sorts[sort][1])
    query = mysession.query(Topics).filter(Topics.topic_id.in_(attr_object)).order_by(sort_func(sort_col))
    try:
        if(len(query_request) >= 1):
            if(len(query_request) == len(filter_request)):
                for i,f in enumerate(filter_request):
                    query = query.filter(getattr(Topics, f).like("%"+query_request[i]+"%"))
            else:
                abort(400)
    except:
        abort(400)
    num_related = query.count()
    max_pages = max(int(ceil(num_related/items_per_page)),1)
    page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
    for instance in query[min_instance:max_instance]:
        page_return["num_results"] += 1
        page_return["objects"].append(instance.as_dict())
    return jsonify(page_return)

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
    return redirect("https://daniel9650.gitbooks.io/poptopic-api-documentation/content/", code=302)

@api.route('/movies/', defaults={'path': ''})
@api.route("/movies/<path:path>", methods=['GET'])
def get_movies(path):
    mysession = scoped_session(Session)
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    query_request = request.args.getlist('q')
    filter_request = request.args.getlist('filter')
    items_per_page_request = request.args.get('items_per_page')
    movie_id = params[0] if (num_params > 0 and len(params[0]) > 0) else ""
    if(movie_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        filter_request = ["movie_name"] if (len(filter_request) <= 0) else filter_request
        min_instance = items_per_page * (page - 1)
        max_instance = items_per_page * page
        if(page >= 1 and sort in movie_sorts and items_per_page >= 1):
            sort_col = getattr(Movies, movie_sorts[sort][0])
            sort_func = getattr(Column, movie_sorts[sort][1])
            query = mysession.query(Movies).order_by(sort_func(sort_col))
            try:
                if(len(query_request) >= 1):
                    if(len(query_request) == len(filter_request)):
                        for i,f in enumerate(filter_request):
                            query = query.filter(getattr(Movies, f).like("%"+query_request[i]+"%"))
                    else:
                        abort(400)
            except:
                abort(400)
            num_rows = query.count()
            max_pages = max(int(ceil(num_rows/items_per_page)),1)
            page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
            for instance in query[min_instance:max_instance]:
                page_return["num_results"] += 1
                page_return["objects"].append(instance.as_dict())
            return jsonify(page_return)
        abort(400)
    else:
        attr_focus = params[1] if (num_params > 1 and len(params[1]) > 0) else ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        if(page >= 1 and items_per_page >= 1):
            instance = mysession.query(Movies).filter(Movies.movie_id == movie_id).first()
            if(instance != None):
                if(attr_focus != ""):
                    if(attr_focus == "similar_books"):
                        if(sort in book_sorts):
                            return get_similar_books(mysession, ast.literal_eval(instance.similar_books), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "similar_songs"):
                        if(sort in song_sorts):
                            return get_similar_songs(mysession, ast.literal_eval(instance.similar_songs), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "topics"):
                        if(sort in topics_sorts):
                            return get_instance_topics(mysession, ast.literal_eval(instance.topics), page, sort, items_per_page, query_request, filter_request)
                    elif(hasattr(instance, attr_focus)):
                        return jsonify(getattr(instance, attr_focus))
                    abort(400)
                else:
                    return jsonify(instance.as_dict())
            abort(404)
        abort(400)

@api.route('/songs/', defaults={'path': ''})
@api.route("/songs/<path:path>", methods=['GET'])
def get_songs(path):
    mysession = scoped_session(Session)
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    query_request = request.args.getlist('q')
    filter_request = request.args.getlist('filter')
    items_per_page_request = request.args.get('items_per_page')
    song_id = params[0] if (num_params > 0 and len(params[0]) > 0) else ""
    if(song_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        filter_request = ["song_name"] if (len(filter_request) <= 0) else filter_request
        min_instance = items_per_page * (page - 1)
        max_instance = items_per_page * page
        if(page >= 1 and sort in song_sorts and items_per_page >= 1):
            sort_col = getattr(Songs, song_sorts[sort][0])
            sort_func = getattr(Column, song_sorts[sort][1])
            query = mysession.query(Songs).order_by(sort_func(sort_col))
            try:
                if(len(query_request) >= 1):
                    if(len(query_request) == len(filter_request)):
                        for i,f in enumerate(filter_request):
                            query = query.filter(getattr(Songs, f).like("%"+query_request[i]+"%"))
                    else:
                        abort(400)
            except:
                abort(400)
            num_rows = query.count()
            max_pages = max(int(ceil(num_rows/items_per_page)),1)
            page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
            for instance in query[min_instance:max_instance]:
                page_return["num_results"] += 1
                page_return["objects"].append(instance.as_dict())
            return jsonify(page_return)
        abort(400)
    else:
        attr_focus = params[1] if (num_params > 1 and len(params[1]) > 0) else ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        if(page >= 1 and items_per_page >= 1):
            instance = mysession.query(Songs).filter(Songs.song_id == song_id).first()
            if(instance != None):
                if(attr_focus != ""):
                    if(attr_focus == "similar_books"):
                        if(sort in book_sorts):
                            return get_similar_books(mysession, ast.literal_eval(instance.similar_books), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "similar_movies"):
                        if(sort in movie_sorts):
                            return get_similar_movies(mysession, ast.literal_eval(instance.similar_movies), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "topics"):
                        if(sort in topics_sorts):
                            return get_instance_topics(mysession, ast.literal_eval(instance.topics), page, sort, items_per_page, query_request, filter_request)
                    elif(hasattr(instance, attr_focus)):
                        return jsonify(getattr(instance, attr_focus))
                    abort(400)
                else:
                    return jsonify(instance.as_dict())
            abort(404)
        abort(400)

@api.route('/books/', defaults={'path': ''})
@api.route("/books/<path:path>", methods=['GET'])
def get_books(path):
    mysession = scoped_session(Session)
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    query_request = request.args.getlist('q')
    filter_request = request.args.getlist('filter')
    items_per_page_request = request.args.get('items_per_page')
    book_id = params[0] if (num_params > 0 and len(params[0]) > 0) else ""
    if(book_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        filter_request = ["book_name"] if (len(filter_request) <= 0) else filter_request
        min_instance = items_per_page * (page - 1)
        max_instance = items_per_page * page
        if(page >= 1 and sort in book_sorts and items_per_page >= 1):
            sort_col = getattr(Books, book_sorts[sort][0])
            sort_func = getattr(Column, book_sorts[sort][1])
            query = mysession.query(Books).order_by(sort_func(sort_col))
            try:
                if(len(query_request) >= 1):
                    if(len(query_request) == len(filter_request)):
                        for i,f in enumerate(filter_request):
                            query = query.filter(getattr(Books, f).like("%"+query_request[i]+"%"))
                    else:
                        abort(400)
            except:
                abort(400)
            num_rows = query.count()
            max_pages = max(int(ceil(num_rows/items_per_page)),1)
            page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
            for instance in query[min_instance:max_instance]:
                page_return["num_results"] += 1
                page_return["objects"].append(instance.as_dict())
            return jsonify(page_return)
        abort(400)
    else:
        attr_focus = params[1] if (num_params > 1 and len(params[1]) > 0) else ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        if(page >= 1 and items_per_page >= 1):
            instance = mysession.query(Books).filter(Books.book_id == book_id).first()
            if(instance != None):
                if(attr_focus != ""):
                    if(attr_focus == "similar_songs"):
                        if(sort in song_sorts):
                            return get_similar_songs(mysession, ast.literal_eval(instance.similar_songs), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "similar_movies"):
                        if(sort in movie_sorts):
                            return get_similar_movies(mysession, ast.literal_eval(instance.similar_movies), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "topics"):
                        if(sort in topics_sorts):
                            return get_instance_topics(mysession, ast.literal_eval(instance.topics), page, sort, items_per_page, query_request, filter_request)
                    elif(hasattr(instance, attr_focus)):
                        return jsonify(getattr(instance, attr_focus))
                    abort(400)
                else:
                    return jsonify(instance.as_dict())
            abort(404)
        abort(400)

@api.route('/topics/', defaults={'path': ''})
@api.route("/topics/<path:path>", methods=['GET'])
def get_topics(path):
    mysession = scoped_session(Session)
    params = path.split("/")
    num_params = len(params)
    page_request = request.args.get('page')
    sort_request = request.args.get('sort')
    query_request = request.args.getlist('q')
    filter_request = request.args.getlist('filter')
    items_per_page_request = request.args.get('items_per_page')
    topic_id = params[0] if (num_params > 0 and len(params[0]) > 0) else ""
    if(topic_id == ""):
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_page if (items_per_page_request is None) else eval(items_per_page_request)
        filter_request = ["topic_name"] if (len(filter_request) <= 0) else filter_request
        min_instance = items_per_page * (page - 1)
        max_instance = items_per_page * page
        if(page >= 1 and sort in topics_sorts and items_per_page >= 1):
            sort_col = getattr(Topics, topics_sorts[sort][0])
            sort_func = getattr(Column, topics_sorts[sort][1])
            query = mysession.query(Topics).order_by(sort_func(sort_col))
            try:
                if(len(query_request) >= 1):
                    if(len(query_request) == len(filter_request)):
                        for i,f in enumerate(filter_request):
                            query = query.filter(getattr(Topics, f).like("%"+query_request[i]+"%"))
                    else:
                        abort(400)
            except:
                abort(400)
            num_rows = query.count()
            max_pages = max(int(ceil(num_rows/items_per_page)),1)
            page_return = {"num_results": 0, "objects": [], "page": page, "total_pages": max_pages}
            for instance in query[min_instance:max_instance]:
                page_return["num_results"] += 1
                page_return["objects"].append(instance.as_dict())
            return jsonify(page_return)
        abort(400)
    else:
        attr_focus = params[1] if (num_params > 1 and len(params[1]) > 0) else ""
        page = 1 if (page_request is None) else eval(page_request)
        sort = "title_asc" if (sort_request is None) else sort_request
        items_per_page = default_items_per_instance_page if (items_per_page_request is None) else eval(items_per_page_request)
        if(page >= 1 and items_per_page >= 1):
            instance = mysession.query(Topics).filter(Topics.topic_id == topic_id).first()
            if(instance != None):
                if(attr_focus != ""):
                    if(attr_focus == "similar_songs"):
                        if(sort in song_sorts):
                            return get_similar_songs(mysession, ast.literal_eval(instance.similar_songs), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "similar_movies"):
                        if(sort in movie_sorts):
                            return get_similar_movies(mysession, ast.literal_eval(instance.similar_movies), page, sort, items_per_page, query_request, filter_request)
                    elif(attr_focus == "similar_books"):
                        if(sort in book_sorts):
                            return get_similar_books(mysession, ast.literal_eval(instance.similar_books), page, sort, items_per_page, query_request, filter_request)
                    elif(hasattr(instance, attr_focus)):
                        return jsonify(getattr(instance, attr_focus))
                    abort(400)
                else:
                    return jsonify(instance.as_dict())
            abort(404)
        abort(400)

@api.route("/git_info/", methods=['GET'])
def get_git_info():
    return jsonify(get_counts())

app.register_blueprint(api)

if __name__ == "__main__":
    app.run(threaded=True)
