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

    @app.route('/preprocess')
    def preprocess():
        preprocessor = Preprocessor()
        df = preprocessor.generate_data()
        print(df.head())
        response = jsonify(df.values.tolist())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    @app.route('/analyze')
    def analyze_data():
        pr = ProbabilisticRegressor()
        pr.RandomForestClassifier('./final_data.csv')
        response = jsonify(pd.read_csv('./output.csv').to_json(orient='records'))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @app.route('/analyzeNN')
    def analyze_neural_network():
        pr = ProbabilisticRegressor()
        mse = pr.NeuralNetworkClassifier('./final_data.csv')
        response = jsonify({"data":pd.read_csv('./output.csv').to_json(orient='records'), "mse":mse})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @app.route('/analyzeRF')
    def analyze_random_forest():
        pr = ProbabilisticRegressor()
        mse = pr.RandomForestClassifier('./final_data.csv')
        response = jsonify({"data":pd.read_csv('./output.csv').to_json(orient='records'), "mse":mse})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    @app.route('/analyzeKNN')
    def analyze_knn():
        pr = ProbabilisticRegressor()
        mse = pr.KNearestNeighborsClassifier('./final_data.csv')
        response = jsonify({"data":pd.read_csv('./output.csv').to_json(orient='records'), "mse":mse})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    @app.route('/analyzeLR')
    def analyze_logistic_regression():
        pr = ProbabilisticRegressor()
        mse = pr.LogisticRegressionClassifier('./final_data.csv')
        response = jsonify({"data":pd.read_csv('./output.csv').to_json(orient='records'), "mse":mse})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    return app
    

if __name__ == "__main__":
    app = create_app()
    app.run(port = 7000)

    
