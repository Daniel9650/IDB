import os
from flask import Flask, request, send_from_directory, render_template, url_for
from GitInfo import get_commits_count, get_issues_count

# the all-important app variable:
app = Flask(__name__, template_folder='build', static_folder='build/static')

# Splash page
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

# Create a 'template' directory to hold HTML templates
# Create a 'static' directory for static files (such as CSS files)
