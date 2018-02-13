import os
from flask import Flask, request, send_from_directory

# the all-important app variable:
app = Flask(__name__, static_folder='build')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def hello(path):
    if(path == ""):
        return send_from_directory('build', 'index.html')
    else:
        if(os.path.exists("build/" + path)):
            return send_from_directory('build/', path)
        else:
            return send_from_directory('build', 'index.html')

@app.route('/static/css/<path:path>')
def send_js(path):
    return send_from_directory('static/css', path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80, use_reloader=True, threaded=True)
