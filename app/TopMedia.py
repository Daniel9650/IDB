"""
Gets top 3 most popular movies and prints the info we want from them
"""

import requests


class Movie:
    def __init__(self):
        self.name = ""
        self.description = ""
        self.release = ""
        self.poster_url = ""
        self.topics = []

    def __str__(self):
        ret = ""
        ret += "Movie name: " + self.name + "\n"
        ret += "Description: " + self.description + "\n"
        ret += "Release date: " + self.release + "\n"
        ret += "Poster url: " + self.poster_url + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        return ret


class Book:
    def __init__(self):
        self.name = ""
        self.description = ""
        self.authors = []
        self.release = ""
        # self.poster_url = ""
        self.topics = []

    def __str__(self):
        ret = ""
        ret += "Book name: " + self.name + "\n"
        ret += "Description: " + self.description + "\n"
        ret += "Release date: " + self.release + "\n"
        # ret += "Poster url: " + self.poster_url + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        return ret


def getTopMovies():
    ret_movies = []

    # read genres
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

    print()
    for i in range(3): # currently we only get the top 3 for phase 1
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
    response = requests.get("https://www.googleapis.com/books/v1/volumes?q=subject:" + topic + "&langRestrict=en&key=AIzaSyDsZoCLSczdtuT0Y5mGCdR2BhT4kpQ_kXA").json() 
    
    book_dict = response["items"][0]["volumeInfo"]

    book = Book()
    book.name = book_dict["title"]
    book.description = book_dict["description"]
    book.release = book_dict["publishedDate"]
    book.topics.append(topic)
    book.topics += book_dict["categories"]
    
    return book

if __name__ == "__main__" :
    movies = getTopMovies()
    
    print("***** MOVIES *****\n")
    for m in movies:
        print(m)
    

    print("***** BOOKS *****\n") 
    for m in movies:
        book = getTopBook(m.topics[0])
        print(book)
