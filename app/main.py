import os
from flask import Flask, request, redirect, url_for, send_from_directory

# the all-important app variable:
app = Flask(__name__, static_folder='build')

# Routes
@app.route('/')
def root():
  return app.send_static_file('build/'+'index.html')

@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file('build/'+ path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80, use_reloader=True, threaded=True)
