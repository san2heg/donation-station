import numpy as np 
import pandas as pd 
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import KFold
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import mean_squared_error
from math import sqrt

class ProbabilisticRegressor:
    def RandomForestClassifier(self, csv):
        X_train, X_test, y_train, y_test = self.preprocessData(csv)

        clf = RandomForestClassifier(n_estimators=100, max_depth=7, random_state=0).fit(X_train, y_train)
        y_pred = clf.predict_proba(X_test)
        starting_df = pd.read_csv(csv)
        end_df = starting_df.loc[900: 1000]
        end_df['prediction'] = np.round(y_pred[:, 1], decimals = 2)
        end_df.to_csv('output.csv', index = False)
        print("RMSE: {}".format(self.getRMSE(y_pred[:, 1], starting_df.loc[900:1000]['donated'].values)))
    
    def KNearestNeighborsClassifier(self, csv):
        X_train, X_test, y_train, y_test = self.preprocessData(csv)

        clf = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
        y_pred = clf.predict_proba(X_test)
        starting_df = pd.read_csv(csv)
        end_df = starting_df.loc[900: 1000]
        end_df['prediction'] = np.round(y_pred[:, 1], decimals = 2)
        end_df.to_csv('output.csv', index = False)
        print("RMSE: {}".format(self.getRMSE(y_pred[:, 1], starting_df.loc[900:1000]['donated'].values)))
    
    def NeuralNetworkClassifier(self, csv):
        X_train, X_test, y_train, y_test = self.preprocessData(csv)

        clf = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(15,), random_state=1).fit(X_train, y_train)
        y_pred = clf.predict_proba(X_test)
        starting_df = pd.read_csv(csv)
        end_df = starting_df.loc[900: 1000]
        end_df['prediction'] = np.round(y_pred[:, 1], decimals = 2)
        end_df.to_csv('output.csv', index = False)
        print("RMSE: {}".format(self.getRMSE(y_pred[:, 1], starting_df.loc[900:1000]['donated'].values)))
    
    def LogisticRegressionClassifier(self, csv):
        X_train, X_test, y_train, y_test = self.preprocessData(csv)

        clf = LogisticRegression(random_state=0, solver='liblinear').fit(X_train, y_train)
        y_pred = clf.predict_proba(X_test)
        starting_df = pd.read_csv(csv)
        end_df = starting_df.loc[900: 1000]
        end_df['prediction'] = np.round(y_pred[:, 1], decimals = 2)
        end_df.to_csv('output.csv', index = False)
        print("RMSE: {}".format(self.getRMSE(y_pred[:, 1], starting_df.loc[900:1000]['donated'].values)))

    @staticmethod
    def getRMSE(y_pred, y):
        return mean_squared_error(y_pred, y)
    
    
    @staticmethod
    def preprocessData(csv):
        starting_df = pd.read_csv(csv)
        y = starting_df.pop('donated').values
        df = starting_df.drop(columns = ['occupation', 'first_name', 'last_name'])
        
        X = df.values
        scaler = StandardScaler()
        scaler.fit(X)
        X = scaler.transform(X)
        kf = KFold(n_splits = 10)

        X_train = np.empty(1000)
        y_train = np.empty(1000)
        X_test = np.empty(1000)
        y_test = np.empty(1000)

        for train_index, test_index in kf.split(X):
            X_train, X_test = X[train_index], X[test_index]
            y_train, y_test = y[train_index], y[test_index]
        
        return X_train, X_test, y_train, y_test


    

if __name__ == "__main__":
    pr = ProbabilisticRegressor()
    pr.LogisticRegressor('../backend/final_data.csv')

