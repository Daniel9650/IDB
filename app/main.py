import os
from flask import Flask, request, send_from_directory, render_template

# the all-important app variable:
app = Flask(__name__)

# EVERY page needs to have the Navbar on top

# Splash page
@app.route('/')
def index():
    return "index"

#Page for browsing models (must include a grid, links to individual instances)

@app.route('/songs')
def song_catalog():
    return "song_catalog"

@app.route('/books')
def book_catalog():
    return "book_catalog"

@app.route('/movies')
def movie_catalog():
    return "movie_catalog"

#Pages for individual data points (must include embedded images, data, links)

@app.route('/songs/<song_name>')
def song(song_name):
    return "song_name"

@app.route('/books/<book_name>')
def book(book_name):
    return "book_name"

@app.route('/movies/<movie_name>')
def movie(movie_name):
    return "movie_name"

if __name__ == "__main__":
    app.run()

# Create a 'template' directory to hold HTML templates
# Create a 'static' directory for static files (such as CSS files)