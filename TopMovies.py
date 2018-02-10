"""
Gets top 3 most popular movies and prints the info we want from them
"""

import requests


# read genres
genres = requests.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US").json()

# convert genres to a dictionary with key genre_id and value of the string
# name of the genre
genres_dic = {}
genres = genres["genres"]
for gen in genres:
    genres_dic[gen["id"]] = gen["name"]

# read first page of popular movies
movies = requests.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=21fed2c614e1de3b61f64b89beb692a5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1").json()
movies = movies["results"]

print()
for i in range(3):
    movie = movies[i]
    print ((i + 1), "Movie name:", movie["original_title"])
    print ("Overview:", movie["overview"])
    print ("Release date:", movie["release_date"])
    print (
        "Poster path: http://image.tmdb.org/t/p/w185" +
        movie["poster_path"])
    topics = movie["genre_ids"]
    print ("Topics:", end=' ')

    for e in range(len(topics)):
        t = topics[e]
        first = False
        if e < len(topics) - 1:
            print (str(genres_dic[t]) + ",", end=' ')
        else:
            print (genres_dic[t])
    print()
