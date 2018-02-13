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
        s = path.split("/")
        fname = s[len(s) - 1]
        del s[len(s) - 1]
        s.insert(0, "build")
        if(os.path.exists("build/" + path)):
            return send_from_directory(os.path.join(*s), fname)
        else:
            return send_from_directory('build', 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80, use_reloader=True, threaded=True)
