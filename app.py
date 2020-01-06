from flask import Flask, request, jsonify
import re
from collections import deque

from pkg.pysat import solver
from pkg.pysat import branch_heuristics as solvers

orderedSolver = solvers.OrderedChoiceSolver

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')

# CORS(app)

'''
Helper method to parse form inputs.

Accepts inputs of the form:
    e.g. {'clause1': 'x1', 'clause2': 'not x2', 'clause3': 'x1 or x2'}

'''
def parse_form(form_data):
    literals = set()
    clauses = set()
    numbered_clauses = dict()
    curr_clause = 1
    
    # Loop over all clauses in order
    field_prefix = 'clause'
    for i in range(1, len(form_data) + 1):
        field = field_prefix + str(i)
        # Split clause into atoms
        clause = form_data[field]
        atoms = [atom.strip() for atom in clause.split('or')]
        # Process current line/clause
        clause = deque()
        for atom in atoms:
            negated = re.search(r'^not x(\d+)$', atom)
            literal = re.search(r'^x(\d+)$', atom)
            if negated:
                clause.append(-1 * int(negated.group(1)))
            else:
                clause.append(int(literal.group(1)))
        clause = frozenset(clause)
        literals.update(map(abs, clause))
        clauses.add(clause)
        numbered_clauses[clause] = curr_clause # TODO: assumes clauses unique, handle assumption
        curr_clause += 1

    print('literals: ', literals)
    print('clauses: ', clauses)
    print('numbered_clauses: ', numbered_clauses)
    print('curr_clause: ', curr_clause)

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
        'data': 'digraph  {2 [label = "x2=F @ 0"]; 1 [label = "x1=T @ 0"]; }'
    })

# test to get form data from server
@app.route('/clauses', methods=["POST"])
def get_clauses():
    req_data = request.get_json()
    print('req_data: ', req_data)
    clauses, literals, numbered_clauses, curr_clause = parse_form(req_data)
    solver = orderedSolver(None, clauses, literals, numbered_clauses, curr_clause)
    isSat, _, _ = solver.run()
    print('input is ', 'SAT' if isSat else 'UNSAT')
    graphs = solver.graphs
    fakeGraphs = ['digraph  {2 [label = "x2=F @ 0"]; 1 [label = "x1=T @ 0"]; }', 'digraph {a -> b}', 'digraph {c -> d}', 'digraph {e -> f}']
    print('graphs generated: ', graphs)
    try:
        if request.method == "POST":
            return jsonify({
                'status': 'success',
                'clauses': req_data,
                'graphs': fakeGraphs
            })

    except Exception as e:
        return e

if __name__ == '__main__':
    app.run()
