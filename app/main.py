import os
from flask import Flask, request, send_from_directory, render_template, url_for

# the all-important app variable:
app = Flask(__name__)

# EVERY page needs to have the Navbar on top
from GitInfo import get_commits_count, get_issues_count

# Splash page
@app.route('/')
def index(): 
    return render_template("index.html")

# About Page
@app.route('/about')
def about():
    commits_count = get_commits_count()
    issues_count = get_issues_count()
    return render_template("about.html", commits_count=commits_count, issues_count=issues_count)

#Page for browsing models (must include a grid, links to individual instances)

@app.route('/music')
def song_catalog():
    return render_template("model.html", name="Music")

@app.route('/books')
def book_catalog():
    return render_template("model.html", name="Books")

@app.route('/movies')
def movie_catalog():
    return render_template("model.html", name="Movies")

@app.route('/topics')
def topic_catalog():
    return render_template("model.html", name="Topics")

#Pages for individual data points (must include embedded images, data, links)

@app.route('/music/<song_name>')
def song(song_name):
    return render_template("model_song.html", name=song_name);

@app.route('/books/<book_name>')
def book(book_name):
    return render_template("model_book.html", name=book_name);

@app.route('/movies/<movie_name>')
def movie(movie_name):
    return render_template("model_movie.html", name=movie_name);

@app.route('/topics/<topic_name>')
def topic(topic_name):
    return render_template("model_topic.html", name=topic_name);

# Movie instances

@app.route('/movies/TheMazeRunner')
def theMazeRunner():
    return render_template("model_movie.html", name="The Maze Runner", release_date= "2014-09-10", poster_url= "http://image.tmdb.org/t/p/w185/coss7RgL0NH6g4fC2s5atvf3dFO.jpg",video_url="4-BTxXm8KSg", desc="Set in a post-apocalyptic world, young Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow “runners” for a shot at escape.")

@app.route('/movies/Minions')
def Minions():
    return render_template("model_movie.html", name="Minions", release_date= "2015-06-17", poster_url= "http://image.tmdb.org/t/p/w185/q0R4crx2SehcEEQEkYObktdeFy.jpg", video_url= "eisKxhjBnZ0", desc= "Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.")

@app.route('/movies/Jumanji')
def Jumaji:
    return render_template("model_movie.html", name="Jumaji", release_date= "1995-12-15" , poster_url= "http://image.tmdb.org/t/p/w185/8wBKXZNod4frLZjAKSDuAcQ2dEU.jpg",video_url= "gN9-SnFB_Jw", desc= "When siblings Judy and Peter discover an enchanted board game that opens the door to a magical world, they unwittingly invite Alan -- an adult who's been trapped inside the game for 26 years -- into their living room. Alan's only hope for freedom is to finish the game, which proves risky as all three find themselves running from giant rhinoceroses, evil monkeys and other terrifying creatures.")

# Song instances


if __name__ == "__main__":
    app.run()

# Create a 'template' directory to hold HTML templates
# Create a 'static' directory for static files (such as CSS files)
