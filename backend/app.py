from flask import Flask, request, jsonify
import numpy as np
import pandas as pd 
import matplotlib as mpl

import sys
sys.path.append("..")
from data.preprocess import Preprocessor

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        preprocessor = Preprocessor()
        df = preprocessor.generate_data()
        print(df.head())
        return jsonify(df.values.tolist())
    
    return app
    

if __name__ == "__main__":
    app = create_app()
    app.run(port = 7000)

    
