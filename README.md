# Donation Station

Made by Rajiv Anisetti, Sanketh Hegde, Raymond Kwan, Kareem Nosseir, and Ritesh Pendekanti.


## About
Donation Station is an online platform built at Hack-A-Wish 2019 that enables the Make-A-Wish foundation to quickly and efficiently identify potential donors and volunteers.

## How it works
Donation Station uses a variety of different machine learning classification models to determine which potential donors and volunteers are most likely to donate based on previously gathered information, including factors such as age, occupation, gender, marital status, and more. The models used include the following:

* Neural networks
* Logistic regression
* Random Forest classifier
* K-Nearest-Neighbors (KNN)

The default model used is the Random Forest classifier, as we found that with our mock data it tended to be the most accurate. However, the user has the option to switch between all 4 models and determine which is best for their dataset based on the accuracy we display.

## How to run
Follow the steps below to get Donation Station up and running!

### Front-end
`npm install`

`npm start`

### Back-end
`python3 ./app.py`
