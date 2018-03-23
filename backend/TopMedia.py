"""
Gets most popular movies, books, and songs. Clears the Movies, Books, Songs, and Topics tables, and then stores the new info on them.
"""

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
from cred import getUser
import random
import hashlib


class MovieEntity(declarative_base()):
    __tablename__ = "Movies"

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
        self.topics = json.dumps(list(map(TopicEntity.get_topic_id, movie.topics)))
        self.similar_books = json.dumps(movie.similar_books)
        self.similar_songs = json.dumps(movie.similar_songs)


class Movie:

    def __init__(self):
        self.name = ""
        self.description = ""
        self.release = ""
        self.poster_url = ""
        self.trailer_url = ""
        self.topics = []
        self.similar_books = []
        self.similar_songs = []
        self.id = ""

    def __str__(self):
        ret = ""
        ret += "Movie name: " + self.name + "\n"
        ret += "Description: " + self.description + "\n"
        ret += "Release date: " + self.release + "\n"
        ret += "Trailer url: " + self.trailer_url + "\n"
        ret += "Poster url: " + self.poster_url + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        ret += "Similar books: " + str(self.similar_books) + "\n"
        ret += "Similar songs: " + str(self.similar_songs) + "\n"
        ret += "Id: " + self.id + "\n"
        return ret


class BookEntity(declarative_base()):
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
        self.topics = json.dumps(list(map(TopicEntity.get_topic_id, book.topics)))
        self.similar_movies = json.dumps(book.similar_movies)
        self.similar_songs = json.dumps(book.similar_songs)


class Book:

    def __init__(self):
        self.name = ""
        self.description = ""
        self.authors = []
        self.release = ""
        self.poster_url = ""
        self.topics = []
        self.similar_movies = []
        self.similar_songs = []
        self.id = ""

    def __str__(self):
        ret = ""
        ret += "Book name: " + self.name + "\n"
        ret += "Authors: " + str(self.authors) + "\n"
        ret += "Description: " + self.description + "\n"
        ret += "Release date: " + self.release + "\n"
        ret += "Poster url: " + self.poster_url + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        ret += "Similar movies: " + str(self.similar_movies) + "\n"
        ret += "Similar songs: " + str(self.similar_songs) + "\n"
        ret += "Id: " + self.id + "\n"

        return ret

    def __repr__(self):
        return self.__str__()


class SongEntity(declarative_base()):
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
        self.youtube_url = song.youtube_url.split("?v=").pop()
        self.release_date = song.release
        self.topics = json.dumps(list(map(TopicEntity.get_topic_id, song.topics)))
        self.similar_movies = json.dumps(song.similar_movies)
        self.similar_books = json.dumps(song.similar_books)


class Song:

    def __init__(self):
        self.name = ""
        self.artists = []
        self.album = ""
        self.poster_url = ""
        self.youtube_url = ""
        self.release = ""
        self.topics = []
        self.similar_movies = []
        self.similar_books = []
        self.id = ""

    def __str__(self):
        ret = ""
        ret += "Song name: " + self.name + "\n"
        ret += "Artists: " + str(self.artists) + "\n"
        ret += "Album: " + self.album + "\n"
        ret += "Album cover url: " + self.poster_url + "\n"
        ret += "Youtube url: " + self.youtube_url + "\n"
        ret += "Release date: " + self.release + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        ret += "Similar movies: " + str(self.similar_movies) + "\n"
        ret += "Similar books: " + str(self.similar_books) + "\n"
        ret += "Id: " + self.id + "\n"

        return ret

    def __repr__(self):
        return self.__str__()


class TopicEntity(declarative_base()):
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

        poster_urls = {
            "Action":
                "https://c1.staticflickr.com/4/3242/2854366734_0f99cbaf31_b.jpg",
            "Romance":
                "https://static.pexels.com/photos/427547/pexels-photo-427547.jpeg",
            "History":
                "https://upload.wikimedia.org/wikipedia/commons/d/d6/Timeless_Books.jpg",
            "Drama":
                "https://upload.wikimedia.org/wikipedia/commons/7/78/Mask_Shopping_in_Venice_%285371442235%29.jpg",
            "Mystery":
                "https://upload.wikimedia.org/wikipedia/commons/e/e0/Postcards_and_magnifying_glass.jpg",
            "Thriller":
                "https://upload.wikimedia.org/wikipedia/commons/a/a6/Alfred_Hitchcock%27s_The_Wrong_Man_trailer_01.png",
            "Music":
                "https://c1.staticflickr.com/3/2100/5819184201_df0392f0e7_b.jpg",
            "Science Fiction":
                "https://upload.wikimedia.org/wikipedia/commons/a/ad/Celia-hovering-airship_mango_concept-art_02.png",
            "Horror":
                "https://www.publicdomainpictures.net/pictures/80000/velka/horror-silhouette-of-a-man.jpg",
            "War":
                "https://static.pexels.com/photos/78783/submachine-gun-rifle-automatic-weapon-weapon-78783.jpeg",
            "Crime":
                "https://farm4.staticflickr.com/3041/2744167003_7498f322d7_o.jpg",
            "Family":
                "https://c1.staticflickr.com/8/7071/13584554804_6c1ebae9bd_b.jpg",
            "Animation":
                "https://c1.staticflickr.com/6/5247/5312400439_c6bf4c41b9_b.jpg",
            "Adventure":
                "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
            "Comedy":
                "https://c1.staticflickr.com/4/3463/5712236914_bba2282f87_b.jpg",
            "Fantasy":
                "https://c1.staticflickr.com/5/4046/4703795262_f427f19971_b.jpg"
        }

        self.poster_url = poster_urls.get(
            topic_name,
            "https://static.pexels.com/photos/356079/pexels-photo-356079.jpeg")

    @staticmethod
    def get_topic_id(topic_name):
        hash_object = hashlib.md5(topic_name.encode())
        return hash_object.hexdigest()[:20]


class SpotifyRequest:

    def __init__(self):
        payload = {"grant_type": "client_credentials"}
        head = {"Authorization":
                "Basic NTA0MjgzNGE0MTJiNDU3NDk2YjM5ZDRkZDA5OTBkMjI6NTQ0MTA5M2MxYTVkNGM0MGFjMzI0ZjM0YTc2YzYyNzM="}

        r = requests.post(
            "https://accounts.spotify.com/api/token",
            data=payload,
            headers=head).json()
        self.token = r["access_token"]

    def query(self, q):
        head = {"Authorization": "Bearer " + self.token}
        return requests.get(q, headers=head).json()


def remove_non_ascii(s):
    return "".join(i for i in s if ord(i) < 128)


def extract_movie_info(response, genres_dict):
    movie = Movie()
    movie.name = response["title"]
    movie.id = str(response["id"])
    movie.description = response["overview"]
    movie.release = response["release_date"]
    movie.poster_url = "http://image.tmdb.org/t/p/w185" + \
        response["poster_path"]

    topic_ids = response["genre_ids"]
    for topic_id in topic_ids:
        movie.topics.append(genres_dict[topic_id])

    movie.trailer_url = get_youtube_url(movie.name + " trailer")

    return movie


def get_top_movies():
    ret_movies = {}

    # read the genres of moviedb
    genres = requests.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US").json()

    # convert genres to a dictionary with key genre_id and value of the string
    # name of the genre
    genres_dict = {}
    genres = genres["genres"]
    for gen in genres:
        genres_dict[gen["id"]] = gen["name"]

    # iterate over pages of movies
    for page in range(1, 3):
        movies = requests.get(
            "https://api.themoviedb.org/3/discover/movie?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
            str(page)).json()

        for result in movies["results"]:
            movie = extract_movie_info(result, genres_dict)
            ret_movies[movie.id] = movie

    return ret_movies


def extract_book_info(response, book_topic):
    # book_dict = response["items"][0]["volumeInfo"]
    book_dict = response["volumeInfo"]

    book = Book()
    book.name = book_dict["title"]
    book.id = str(response["id"])
    book.authors = book_dict["authors"]
    if "description" in book_dict:
        book.description = book_dict["description"]
    book.release = book_dict["publishedDate"]
    book.poster_url = book_dict["imageLinks"]["thumbnail"]
    book.topics.append(book_topic)
    """
    for category in book_dict["categories"]:
        if category not in book.topics:
            book.topics.append(category)
    """

    return book


def get_top_books(topics):
    ret_books = {}

    for topic in topics:
        save_topic = topic.replace(" ", "+")

        response = requests.get(
            "https://www.googleapis.com/books/v1/volumes?q=subject:" +
            save_topic +
            "&langRestrict=en&key=AIzaSyDsZoCLSczdtuT0Y5mGCdR2BhT4kpQ_kXA").json()

        for i in range(3):  # 3 books per topic
            if i >= len(response["items"]):
                break

            book = extract_book_info(response["items"][i], topic)
            ret_books[book.id] = book

    return ret_books


def extract_song_info(response, song_topic, spotify_api):
    playlist_href = response["href"]

    track_dict = spotify_api.query(
        playlist_href)["tracks"]["items"][0]["track"]
    song = Song()
    song.name = track_dict["name"]
    song.id = str(track_dict["id"])
    for artist in track_dict["artists"]:
        song.artists.append(artist["name"])

    album_href = track_dict["album"]["href"]

    album_dict = spotify_api.query(album_href)

    song.album = album_dict["name"]
    song.release = album_dict["release_date"]
    song.topics.append(song_topic)
    song.poster_url = album_dict["images"][0]["url"]
    song.youtube_url = get_youtube_url(song.name + " " + song.artists[0])

    return song


def get_top_songs(topics):
    spotify_api = SpotifyRequest()

    ret_songs = {}

    for topic in topics:
        save_topic = topic.replace(" ", "+")

        response = spotify_api.query(
            "https://api.spotify.com/v1/search?q=" +
            save_topic +
            "&type=playlist&market=US")
        response = response["playlists"]

        for i in range(3):  # 3 songs per topic
            if i >= len(response["items"]):
                break

            song = extract_song_info(response["items"][i], topic, spotify_api)

            if remove_non_ascii(song.name) != "":
                ret_songs[song.id] = song

    return ret_songs


def get_youtube_url(query_text):
    query_text = query_text.replace(" ", "+")
    videos = requests.get(
        "https://www.googleapis.com/youtube/v3/search?q=" +
        query_text +
        "&part=snippet&type=video&key=AIzaSyA_kByPFNibKSvpQxR-dMILjfx2M1TEgDg").json()
    return "https://www.youtube.com/watch?v=" + \
        videos["items"][0]["id"]["videoId"]


def get_media_per_topic(media):
    media_per_topic = {}
    for media_id, media_info in media.items():
        for topic in media_info.topics:
            if topic not in media_per_topic:
                media_per_topic[topic] = [media_id]
            else:
                media_per_topic[topic].append(media_id)

    return media_per_topic


def get_topics(movies):
    topics = set()
    for movie_id, movie_info in movies.items():
        for topic in movie_info.topics:
            topics.add(topic)

    return list(topics)


def record_similarities(
        media_type,
        media,
        movies_per_topic,
        books_per_topic,
        songs_per_topic):
    for _, media_info in media.items():
        for i in range(3):  # up to three similar media per media type
            if media_type != "movies":
                rand_topic = random.choice(media_info.topics)
                rand_movie = random.choice(movies_per_topic[rand_topic])
                if rand_movie not in media_info.similar_movies:
                    media_info.similar_movies.append(rand_movie)

            if media_type != "books":
                rand_topic = random.choice(media_info.topics)
                rand_book = random.choice(books_per_topic[rand_topic])
                if rand_book not in media_info.similar_books:
                    media_info.similar_books.append(rand_book)

            if media_type != "songs":
                rand_topic = random.choice(media_info.topics)
                rand_song = random.choice(songs_per_topic[rand_topic])
                if rand_song not in media_info.similar_songs:
                    media_info.similar_songs.append(rand_song)


def create_session():
    # an Engine, which the Session will use for connection resources
    con_str = "mysql+pymysql://" + getUser() + \
        "@pt-db-instance.cden9ozljt61.us-west-1.rds.amazonaws.com:3306/poptopic_db"
    engine = create_engine(con_str)

    # create a configured "Session" class
    Session = sessionmaker(bind=engine)

    # create a Session
    return Session()


def store_in_db(
        movies,
        books,
        songs,
        movies_per_topic,
        books_per_topic,
        songs_per_topic):
    session = create_session()

    # start table from scratch
    session.query(MovieEntity).delete()
    session.query(BookEntity).delete()
    session.query(SongEntity).delete()
    session.query(TopicEntity).delete()

    for _, m in movies.items():
        session.add(MovieEntity(m))
    for _, b in books.items():
        session.add(BookEntity(b))
    for _, s in songs.items():
        session.add(SongEntity(s))

    for topic in movies_per_topic.keys():
        session.add(
            TopicEntity(
                topic, movies_per_topic.get(
                    topic, []), books_per_topic.get(
                    topic, []), songs_per_topic.get(
                    topic, [])))

    session.commit()


def get_media_from_db():
    # Function for debugging purposes

    session = create_session()
    print("Printing Movies: ")
    q = session.query(MovieEntity)
    for instance in q:
        print(instance.movie_id, instance.movie_name, instance.trailer_url)

    print("\nPrinting Books: ")
    q = session.query(BookEntity)
    for instance in q:
        print(instance.book_id, instance.book_name)

    print("\nPrinting Songs: ")
    q = session.query(SongEntity)
    for instance in q:
        print(instance.song_id, instance.song_name)

    print("\nPrinting Topics: ")
    q = session.query(TopicEntity)
    for instance in q:
        print(
            instance.topic_id,
            instance.topic_name,
            instance.similar_books,
            instance.poster_url)


def print_media(top_movies, top_books, top_songs):
    # Function for debugging purposes

    print("***** MOVIES *****\n")
    for _, m in top_movies.items():
        print(m)

    print("***** BOOKS *****\n")
    for _, b in top_books.items():
        print(b)

    print("***** SONGS *****\n")
    for _, s in top_songs.items():
        print(s)


if __name__ == "__main__":
    DEBUG_MODE = False

    if DEBUG_MODE:
        get_media_from_db()
        sys.exit()

    top_movies = get_top_movies()
    topics = get_topics(top_movies)

    top_books = get_top_books(topics)
    top_songs = get_top_songs(topics)

    movies_per_topic = get_media_per_topic(top_movies)
    books_per_topic = get_media_per_topic(top_books)
    songs_per_topic = get_media_per_topic(top_songs)

    record_similarities(
        "movies",
        top_movies,
        movies_per_topic,
        books_per_topic,
        songs_per_topic)
    record_similarities(
        "books",
        top_books,
        movies_per_topic,
        books_per_topic,
        songs_per_topic)
    record_similarities(
        "songs",
        top_songs,
        movies_per_topic,
        books_per_topic,
        songs_per_topic)

    # print_media(top_movies, top_books, top_songs)

    store_in_db(
        top_movies,
        top_books,
        top_songs,
        movies_per_topic,
        books_per_topic,
        songs_per_topic)
