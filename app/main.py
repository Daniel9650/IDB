import os
from flask import Flask, send_from_directory

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
def static_css(path):
    if(os.path.exists("build/static/css/" + path)):
        return send_from_directory(os.path.join('build', 'static', 'css'), path)
    else:
        return send_from_directory('build', 'index.html')

@app.route('/static/js/<path:path>')
def static_js(path):
    if(os.path.exists("build/static/js/" + path)):
        return send_from_directory(os.path.join('build', 'static', 'js'), path)
    else:
        return send_from_directory('build', 'index.html')

@app.route('/static/media/<path:path>')
def static_media(path):
    if(os.path.exists("build/static/media/" + path)):
        return send_from_directory(os.path.join('build', 'static', 'media'), path)
    else:
        return send_from_directory('build', 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80, use_reloader=True, threaded=True)
