import json, http
from flask import Flask, request, jsonify, Response
import logging

from handle_tea.preregis_to_tea import process_to_tea

app = Flask(__name__)

# @app.route('/')
# def hello():
#     return "Hello World"
#
# @app.route('/', methods=["GET", "POST"])
# def submit():
#     if request.method == "POST":
#         data = json.loads(request.data)
#         type, name, dependentOrIndependent = data['type'], data['name'], data['variable']
#         if len(name) != 0 and len(type) != 0:
#             # logging.info("Type is: " + type)
#             # logging.info("Name is: " + name)
#             logging.warning(type + " ,," + name + ".. " + dependentOrIndependent)
#             # add Tea logic
#             return Response("Success", http.HTTPStatus.OK)
#         return Response("Bad Request", http.HTTPStatus.BAD_REQUEST)

@app.route('/submit', methods=["GET", "POST"])
def submit_study():
    logging.warning("Hi")
    if request.method == "POST":
        logging.warning(request.data)
        data = json.loads(request.data)
        logging.warning(data)
        study_type = data['study_type']
        dependent_variables = data['dependent_variables']
        independent_variables = data['independent_variables']
        hypothesis = data['hypothesis']

        if study_type is "experiment" or study_type is "observational_study":
            if len(dependent_variables) > 0 and len(independent_variables) > 0:
                if len(hypothesis) > 0:
                    result = process_to_tea(study_type, dependent_variables, independent_variables, hypothesis)
                    return jsonify({
                        'res': result
                    }), http.HTTPStatus.OK
                else:
                    return "Bad Request: Hypothesis Input Bad", http.HTTPStatus.BAD_REQUEST
            else:
                return "Bad Request: Variable Input Bad", http.HTTPStatus.BAD_REQUEST
        return "Bad Request: Study Type Input Bad", http.HTTPStatus.BAD_REQUEST
