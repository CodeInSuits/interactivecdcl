from flask import Flask, request, jsonify

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')

# CORS(app)

# home page
@app.route('/')
def root():
    return app.send_static_file('index.html')

# server ping for testing client server connection
@app.route('/ping')
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })

# test to send dot string to client for render 
@app.route('/dotstr')
def dot_str():
    return jsonify({
        'status': 'success',
        'data': 'digraph  {a -> b}'
    })

if __name__ == '__main__':
    app.run()
