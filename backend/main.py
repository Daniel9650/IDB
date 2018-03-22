import os
from flask import Flask, request, send_from_directory, render_template, url_for, Blueprint, redirect
from GitInfo import get_commits_count, get_issues_count

# the all-important app variable:
app = Flask(__name__, template_folder='.', static_folder='static')
app.config['SERVER_NAME'] = 'poptopic.org'

api = Blueprint('api', 'api', subdomain='api')

# Splash page
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def app_index(path):
    return render_template("index.html")

# API page
@api.route('/', defaults={'path': ''})
@api.route('/<path:path>')
def api_index(path):
    if(path == ''):
        return "api page."
    else:
        new_path = 'http://ec2-52-53-154-252.us-west-1.compute.amazonaws.com/api/' + path
        return redirect(new_path, code=302)

app.register_blueprint(api)

if __name__ == "__main__":
    app.run()
