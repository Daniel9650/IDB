import os
from flask import Flask, request, send_from_directory, render_template, url_for

# the all-important app variable:
app = Flask(__name__)

# EVERY page needs to have the Navbar on top

# Splash page
@app.route('/')
def index():
    return render_template("index.html")

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

if __name__ == "__main__":
    app.run()

# Create a 'template' directory to hold HTML templates
# Create a 'static' directory for static files (such as CSS files)
