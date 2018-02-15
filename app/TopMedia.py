"""
Gets top 3 most popular movies, books, and songs. Prints the info we want from them.
"""

import requests


class Movie:

    def __init__(self):
        self.name = ""
        self.description = ""
        self.release = ""
        self.poster_url = ""
        self.topics = []
        self.similar_books = []
        self.similar_songs = []

    def __str__(self):
        ret = ""
        ret += "Movie name: " + self.name + "\n"
        ret += "Description: " + self.description + "\n"
        ret += "Release date: " + self.release + "\n"
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
        # self.poster_url = ""
        self.topics = []
        self.similar_movies = []
        self.similar_songs = []

    def __str__(self):
        ret = ""
        ret += "Book name: " + self.name + "\n"
        ret += "Description: " + self.description + "\n"
        ret += "Release date: " + self.release + "\n"
        # ret += "Poster url: " + self.poster_url + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        ret += "Similar movies: " + str(self.similar_movies) + "\n"
        ret += "Similar songs: " + str(self.similar_songs) + "\n"

        return ret


class Song:

    def __init__(self):
        self.name = ""
        self.artists = []
        self.album = ""
        self.release = ""
        self.topics = []
        self.similar_movies = []
        self.similar_books = []

    def __str__(self):
        ret = ""
        ret += "Song name: " + self.name + "\n"
        ret += "Artists: " + str(self.artists) + "\n"
        ret += "Album: " + self.album + "\n"
        ret += "Release date: " + self.release + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        ret += "Similar movies: " + str(self.similar_movies) + "\n"
        ret += "Similar books: " + str(self.similar_books) + "\n"

        return ret


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
    ret_movies = []

    # read genres of moviedb
    genres = requests.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US").json()

    # convert genres to a dictionary with key genre_id and value of the string
    # name of the genre
    genres_dict = {}
    genres = genres["genres"]
    for gen in genres:
        genres_dict[gen["id"]] = gen["name"]

    # read first page of popular movies
    movies = requests.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1").json()
    movies_dict = movies["results"]

    for i in range(3):  # currently we only get the top 3 for phase 1
        movie_dict = movies_dict[i]

        movie = Movie()
        movie.name = movie_dict["original_title"]
        movie.description = movie_dict["overview"]
        movie.release = movie_dict["release_date"]
        movie.poster_url = "http://image.tmdb.org/t/p/w185" + \
            movie_dict["poster_path"]

        topic_ids = movie_dict["genre_ids"]
        for topic_id in topic_ids:
            movie.topics.append(genres_dict[topic_id])

        ret_movies.append(movie)

    return ret_movies


def getTopBook(topic):
    topic = topic.replace(" ", "+")
    response = requests.get(
        "https://www.googleapis.com/books/v1/volumes?q=subject:" +
        topic +
     "&langRestrict=en&key=AIzaSyDsZoCLSczdtuT0Y5mGCdR2BhT4kpQ_kXA").json(
    )

    book_dict = response["items"][0]["volumeInfo"]

    book = Book()
    book.name = book_dict["title"]
    book.description = book_dict["description"]
    book.release = book_dict["publishedDate"]
    book.topics.append(topic)
    for category in book_dict["categories"]:
        if category not in book.topics:
            book.topics.append(category)

    return book


def getTopSong(topic, spotify_api):
    topic = topic.replace(" ", "+")
    response = spotify_api.query(
        "https://api.spotify.com/v1/search?q=" +
        topic +
     "&type=playlist&market=US")
    response = response["playlists"]["items"]
    playlist_href = response[0]["href"]

    track_dict = spotify_api.query(
        playlist_href)["tracks"]["items"][0]["track"]

    song = Song()
    song.name = track_dict["name"]
    for artist in track_dict["artists"]:
        song.artists.append(artist["name"])

    album_href = track_dict["album"]["href"]

    album_dict = spotify_api.query(album_href)

    song.album = album_dict["name"]
    song.release = album_dict["release_date"]
    song.topics.append(topic)

    return song

if __name__ == "__main__":
    top_movies = getTopMovies()

    top_books = []
    used_topics = []
    for m in top_movies:
        for t in m.topics:
            if t not in used_topics:
                used_topics.append(t)
                break
        top_books.append(getTopBook(used_topics[-1]))

    spotify_api = SpotifyRequest()
    top_songs = []
    for t in used_topics:
        top_songs.append(getTopSong(t, spotify_api))

    for i in range(len(top_movies)):
        top_movies[i].similar_books.append(top_books[i].name)
        top_movies[i].similar_songs.append(top_songs[i].name)
    for i in range(len(top_books)):
        top_books[i].similar_movies.append(top_movies[i].name)
        top_books[i].similar_songs.append(top_songs[i].name)
    for i in range(len(top_songs)):
        top_songs[i].similar_books.append(top_books[i].name)
        top_songs[i].similar_movies.append(top_movies[i].name)

    print("***** MOVIES *****\n")
    for m in top_movies:
        print(m)

    print("***** BOOKS *****\n")
    for b in top_books:
        print(b)

    print("***** SONGS *****\n")
    for s in top_songs:
        print(s)
