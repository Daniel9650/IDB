import os
from flask import Flask, request, send_from_directory, render_template, url_for
from GitInfo import get_commits_count, get_issues_count

# the all-important app variable:
app = Flask(__name__)

# Splash page
@app.route('/')
def index(): 
    return render_template("index.html")

# About Page
@app.route('/about')
def about():
    commits_count = get_commits_count();
    issues_count = get_issues_count();
    return render_template("about.html", commits=commits_count, issues=issues_count)

#Page for browsing models (must include a grid, links to individual instances)

@app.route('/music')
def song_catalog():
    return render_template("music.html", name="Music")

@app.route('/books')
def book_catalog():
    return render_template("books.html", name="Books")

@app.route('/movies')
def movie_catalog():
    return render_template("movies.html", name="Movies")

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

@app.route('/movies/themazerunner')
def theMazeRunner():
    return render_template("themazerunner.html")

@app.route('/movies/minions')
def Minions():
    return render_template("minions.html")

@app.route('/movies/jumanji')
def Jumanji():
    return render_template("jumanji.html")

# Music instances

@app.route('/music/synergy')
def synergy():
    return render_template("synergy.html")

@app.route('/music/drivemycar')
def drivemycar():
    return render_template("drivemycar.html")

@app.route('/music/babyblue')
def babyblue():
    return render_template("babyblue.html")

# Book instances
@app.route('/books/thepenguinscrimewave')
def penguin():
    return render_template("thepenguinscrimewave.html")

@app.route('/books/youchoose2')
def youchoose2():
    return render_template("youchoose2.html")

@app.route('/books/ionlysaythisbecauseiloveyou')
def loveyou():
    return render_template("ionlysaythisbecauseiloveyou.html")

if __name__ == "__main__":
    app.run()

# Create a 'template' directory to hold HTML templates
# Create a 'static' directory for static files (such as CSS files)
