import json, http
from flask import Flask, request, jsonify, send_from_directory
import logging
import global_vals

from handle_tea.preregis_to_tea import get_test_result
from handle_tea.power_analysis import get_powers

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World"

@app.route('/data/<path:path>')
def upload(path):
    return send_from_directory('data', path)

@app.route('/preregistea', methods=["GET", "POST"])
def preregistea():
    logging.warning("Connected with preregistea...")
    if request.method == "POST":
        logging.info("Study Information (Tea) POSTed ...")
        data = json.loads(request.data)
        logging.warning(type(data['variables']))

        return get_test_result(data)

@app.route('/power', methods=["GET", "POST"])
def power_analysis():
    logging.warning("Conducting power analysis...")
    if request.method == "POST":
        logging.info("Informatin POSTed ...")
        data = json.loads(request.data)

        return get_powers(data)


@app.route('/submit', methods=["GET", "POST"])
def submit_study():
    logging.warning("Hi")
    if request.method == "POST":
        logging.info("Study Information (Tea) POSTed ...")
        data = json.loads(request.data)
        study_type = data[global_vals.STUDY_TYPE]
        dependent_variables = data[global_vals.DEPENDENT_VARS]
        independent_variables = data[global_vals.INDEPENDENT_VARS]
        logging.warning(independent_variables)
        logging.warning(independent_variables[0].keys())
        logging.warning(independent_variables[0]['categories'])
        hypothesis = data[global_vals.HYPOTHESIS]

        if study_type == global_vals.EXPERIMENT or study_type == global_vals.OBSERVATIONAL:
            if len(dependent_variables) > 0 and len(independent_variables) > 0:
                if len(hypothesis) > 0:
                    # result =  (study_type, independent_variables, dependent_variables, hypothesis)
                    result = "hi"
                    return jsonify({
                        'res': result
                    }), http.HTTPStatus.OK
                else:
                    logging.warning("Hypothesis should not be empty.")
                    return "Bad Request: Hypothesis Input Bad", http.HTTPStatus.BAD_REQUEST
            else:
                logging.warning("Dependent or independent variables should not be empty.")
                return "Bad Request: Variable Input Bad", http.HTTPStatus.BAD_REQUEST
        logging.warning("Study Type Input should be 'Experiment' or 'Observational Study'")
        return "Bad Request: Study Type Input Bad", http.HTTPStatus.BAD_REQUEST

