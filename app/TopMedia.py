"""
Gets top 3 most popular movies, books, and songs. Prints the info we want from them.
"""

import requests
import random


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
        return ret


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

        return ret

    def __repr__(self):
        return self.__str__()


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

        return ret
    
    def __repr__(self):
        return self.__str__()

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


def getTopMovies():
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

    # read the first page of popular movies
    movies = requests.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1").json()
    movies_dict = movies["results"]

    for i in range(3):  # currently we only get the top 3 for phase 1
        movie_dict = movies_dict[i]

        movie = Movie()
        movie.name = movie_dict["original_title"]
        movie.id = str(movie_dict["id"])
        movie.description = movie_dict["overview"]
        movie.release = movie_dict["release_date"]
        movie.poster_url = "http://image.tmdb.org/t/p/w185" + \
            movie_dict["poster_path"]

        topic_ids = movie_dict["genre_ids"]
        for topic_id in topic_ids:
            movie.topics.append(genres_dict[topic_id])

        movie.trailer_url = getYoutubeUrl(movie.name + " trailer")

        ret_movies[movie.id] = movie

    return ret_movies


def extract_book_info(response, book_topic):
    # book_dict = response["items"][0]["volumeInfo"]
    book_dict = response["volumeInfo"]

    book = Book()
    book.name = book_dict["title"]
    book.id = str(response["id"])
    book.authors = book_dict["authors"]
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


def getTopBooks(topics):
    ret_books = {}

    for topic in topics:
        save_topic = topic.replace(" ", "+")
    
        response = requests.get(
            "https://www.googleapis.com/books/v1/volumes?q=subject:" +
            save_topic +
         "&langRestrict=en&key=AIzaSyDsZoCLSczdtuT0Y5mGCdR2BhT4kpQ_kXA").json()

        for i in range(3): # 3 books per topic
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
    song.youtube_url = getYoutubeUrl(song.name + " " + song.artists[0])

    return song


def getTopSongs(topics):
    spotify_api = SpotifyRequest()

    ret_songs = {}

    for topic in topics:
        save_topic = topic.replace(" ", "+")
        
        response = spotify_api.query(
            "https://api.spotify.com/v1/search?q=" +
            save_topic +
         "&type=playlist&market=US")
        response = response["playlists"]
 

        for i in range(3): # 3 songs per topic
            if i >= len(response["items"]):
                break

            song = extract_song_info(response["items"][i], topic, spotify_api)
            ret_songs[song.id] = song

    return ret_songs


def getYoutubeUrl(query_text):
    query_text = query_text.replace(" ", "+")
    videos = requests.get("https://www.googleapis.com/youtube/v3/search?q=" + query_text + "&part=snippet&type=video&key=AIzaSyA_kByPFNibKSvpQxR-dMILjfx2M1TEgDg").json()
    return "https://www.youtube.com/watch?v=" + videos["items"][0]["id"]["videoId"]


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


def record_similarities(media_type, media, movies_per_topic, books_per_topic, songs_per_topic):
    for _, media_info in media.items():
        if media_type != "movies":
            rand_topic = random.choice(media_info.topics)
            rand_movie = random.choice(movies_per_topic[rand_topic])
            media_info.similar_movies.append(rand_movie)
        
        if media_type != "books":
            rand_topic = random.choice(media_info.topics)
            rand_book = random.choice(books_per_topic[rand_topic])
            media_info.similar_books.append(rand_book)
        
        if media_type != "songs":
            rand_topic = random.choice(media_info.topics)
            rand_song = random.choice(songs_per_topic[rand_topic])
            media_info.similar_songs.append(rand_song)
        


if __name__ == "__main__":
    top_movies = getTopMovies()
    topics = get_topics(top_movies)

    top_books = getTopBooks(topics)
    top_songs = getTopSongs(topics)

    movies_per_topic = get_media_per_topic(top_movies)
    books_per_topic = get_media_per_topic(top_books)
    songs_per_topic = get_media_per_topic(top_songs)

    record_similarities("movies", top_movies, movies_per_topic, books_per_topic, songs_per_topic)
    record_similarities("books", top_books, movies_per_topic, books_per_topic, songs_per_topic)
    record_similarities("songs", top_songs, movies_per_topic, books_per_topic, songs_per_topic)

    print("***** MOVIES *****\n")
    for _, m in top_movies.items():
        print(m)

    print("***** BOOKS *****\n")
    for _, b in top_books.items():
        print(b)

    print("***** SONGS *****\n")
    for _, s in top_songs.items():
        print(s)
