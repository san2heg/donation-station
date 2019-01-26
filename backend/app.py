from flask import Flask, request, jsonify
import numpy as np
import pandas as pd 
import matplotlib as mpl


def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Let's get it boy"
    
    return app
    


if __name__ == "__main__":
    app = create_app()
    app.run(port = 7000)
    
