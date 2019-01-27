from flask import Flask, request, jsonify
import numpy as np
import pandas as pd 
import matplotlib as mpl
import sklearn as skl

import sys
sys.path.append("..")
from data.preprocess import Preprocessor
from data.classifiers import ProbabilisticRegressor

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        preprocessor = Preprocessor()
        df = preprocessor.generate_data()
        print(df.head())
        return jsonify(df.values.tolist())
    
    @app.route('/analyze')
    def analyze_data():
        pr = ProbabilisticRegressor()
        pr.RandomForestClassifier('./final_data.csv')
        return jsonify(pd.read_csv('./output.csv').to_json(orient='records'))


    
    return app
    

if __name__ == "__main__":
    app = create_app()
    app.run(port = 7000)

    
