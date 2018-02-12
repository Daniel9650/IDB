from flask import Flask, send_from_directory

# the all-important app variable:
app = Flask(__name__, static_folder='build')

@app.route("/")
def hello():
    return send_from_directory('build', 'index.html');

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
