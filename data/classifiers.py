import numpy as np 
import pandas as pd 
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import KFold
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier




class ProbabilisticRegressor:
    @staticmethod
    def LogisticRegressor(csv):
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

        clf = DecisionTreeClassifier(criterion = "entropy", max_depth = 15).fit(X_train, y_train)
        y_pred = clf.predict_proba(X_test)
        sample_df = starting_df
        sample_df['donated'] = y
        end_df = sample_df.loc[900: 1000]
        end_df['prediction'] = np.round(y_pred[:, 0], decimals = 2)
        end_df.to_csv('output.csv', index = False)

    

if __name__ == "__main__":
    pr = ProbabilisticRegressor()
    pr.LogisticRegressor('../backend/final_data.csv')

