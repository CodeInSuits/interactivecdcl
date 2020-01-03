from flask import Flask, request, jsonify

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')

# CORS(app)

'''
Helper method
'''
# parse form input 
def parse_form(form_data):
    literals = set()
    clauses = set()
    numbered_clauses = dict()
    curr_clause = 1
    lines = [line.strip().split() for line in form_data.values()]
    for line in lines:
        clause = frozenset(map(int, line))
        literals.update(map(abs, clause))
        clauses.add(clause)
        numbered_clauses[clause] = curr_clause # TODO: assumes clauses unique, handle assumption
        curr_clause += 1
    print(literals, clauses, numbered_clauses, curr_clause)
    return clauses, literals, numbered_clauses, curr_clause

'''
Http route
'''
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

# test to get form data from server
@app.route('/clauses', methods=["POST"])
def get_clauses():
    req_data = request.get_json()
    parse_form(req_data)
    try:
        if request.method == "POST":
            return jsonify({
            'status': 'success',
            'data': req_data
            })

    except Exception as e:
        return e

if __name__ == '__main__':
    app.run()
