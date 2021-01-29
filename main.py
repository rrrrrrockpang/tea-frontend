import json, http

from flask import Flask, render_template, request, redirect, Response
import logging

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World"

@app.route('/', methods=["GET", "POST"])
def submit():
    if request.method == "POST":
        data = json.loads(request.data)
        type, name, dependentOrIndependent = data['type'], data['name'], data['variable']
        if len(name) != 0 and len(type) != 0:
            # logging.info("Type is: " + type)
            # logging.info("Name is: " + name)
            logging.warning(type + " ,," + name + ".. " + dependentOrIndependent)
            # add Tea logic
            return Response("Success", http.HTTPStatus.OK)
        return Response("Bad Request", http.HTTPStatus.BAD_REQUEST)

