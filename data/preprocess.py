import pandas as pd
import numpy as np 


class Preprocessor:
    def generate_data(self):
        df = pd.read_csv('../data/mock_data.csv')
        df = df.drop('id', axis = 1) # Drop useless columns
        df = df.drop('is_bilingual', axis = 1)
        # Randomly Generate Ages
        ages = np.round(np.random.uniform(low = 21, high = 85, size = 1000), decimals = 0).astype(int)
        df['ages'] = ages


        # Generate occupations/salaries
        occupation_df = self.create_occupation_salary_df()
        occupations = occupation_df['job'].values
        salary_list = occupation_df['salary'].values

        salaries = np.zeros(df['occupation'].shape)
        for index, occupation in enumerate(df['occupation'].values):
            salaries[index] = salary_list[list(occupations).index(occupation)]

        df['salary'] = salaries.astype(int)

        # Switch gender to binary attributes
        genders = np.zeros(df['gender'].shape)
        for i, gender in enumerate(df['gender'].values):
            if (gender == "Male"):
                genders[i] = 1
            else:
                genders[i] = 0
        
        df['gender'] = genders.astype(int)

        # Switch prev_donor to binary attributes
        donors = np.zeros(df['prev_donor'].shape)
        for i, donated in enumerate(df['prev_donor'].values):
            if (donated == True):
                donors[i] = 1
            else:
                donors[i] = 0
        
        df['prev_donor'] = donors.astype(int)

        print(df.tail())
        df.to_csv('processed_data.csv', index = False)
        return df 
    
    @staticmethod
    def create_occupation_salary_df():
        occupation_df = pd.read_csv('../data/occupations.csv')
        salaries_values = occupation_df['salary'].values
        salaries = np.zeros(salaries_values.shape)

        occupation_df['job'] = occupation_df['job'].str.strip()

        for i, salary in enumerate(salaries_values):
            salary = int(salary.replace(',', '')) if type(salary) is str else int(salary)
            salaries[i] = salary
        
        occupation_df['salary'] = salaries.astype(int)

        print(occupation_df.head())

        return occupation_df

if __name__ == "__main__":
    preprocessor = Preprocessor()
    preprocessor.generate_data()




