"""
Gets top 3 most popular movies and prints the info we want from them
"""

import requests


class Movie:
    def __init__(self):
        self.title = ""
        self.overview = ""
        self.release = ""
        self.poster_url = ""
        self.topics = []

    def __str__(self):
        ret = ""
        ret += "Movie title: " + self.title + "\n"
        ret += "Overview: " + self.overview + "\n"
        ret += "Release date: " + self.release + "\n"
        ret += "Poster url: " + self.poster_url + "\n"
        ret += "Topics: " + str(self.topics) + "\n"
        return ret


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
movies = movies["results"]

print()
for i in range(3):
    movie_dict = movies[i]

    movie = Movie()
    movie.title = movie_dict["original_title"]
    movie.overview = movie_dict["overview"]
    movie.release = movie_dict["release_date"]
    movie.poster_url = "http://image.tmdb.org/t/p/w185" + \
        movie_dict["poster_path"]

    topic_ids = movie_dict["genre_ids"]
    for topic_id in topic_ids:
        movie.topics.append(genres_dict[topic_id])

    print(movie)
