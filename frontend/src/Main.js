import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'

import Insights from './Insights.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};

    this.dataPage = this.dataPage.bind(this);
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:7000/analyze')
      .then(res => {
        console.log(res.data);
        this.setState({
          data: JSON.parse(res.data)
        })
      });
  }

  dataPage() {
    let occupations = [...new Set(this.state.data.map(item => item.occupation))];
    let occupationElements = occupations.map(ocp => (
      <option key={ocp} value={ocp}>{ocp}</option>
    ));

    const columns = [{
      Header: 'First Name',
      accessor: 'first_name', // String-based value accessors!
      filterable: false
    }, {
      Header: 'Last_Name',
      accessor: 'last_name',
      filterable: false
    }, {
      Header: 'Age',
      accessor: 'ages',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "0-20") {
          return row[filter.id] >= 0 && row[filter.id] <= 20;
        } else if (filter.value === "21-35") {
          return row[filter.id] >= 21 && row[filter.id] <= 35;
        } else if (filter.value === "36-50") {
          return row[filter.id] >= 36 && row[filter.id] <= 50;
        } else if (filter.value === "51+") {
          return row[filter.id] >= 51;
        }
        return true;
      },
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="0-20">0-20</option>
          <option value="21-35">21-35</option>
          <option value="36-50">36-50</option>
          <option value="50+">51+</option>
        </select>
      )
    }, {
      Header: 'Gender',
      accessor: 'gender',
      Cell: ({ value }) => (value == 1 ? "Male" : "Female"),
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "male") {
          return row[filter.id] == 1;
        } else if (filter.value === "female") {
          return row[filter.id] == 0;
        }
        return true;
      }
    }, {
      Header: 'Occupation',
      accessor: 'occupation',
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          {occupationElements}
        </select>
      ),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return filter.value === row[filter.id];
      }
    }, {
      Header: 'Previous Donor',
      accessor: 'prev_donor',
      Cell: ({ value }) => (value == 1 ? "Yes" : "No"),
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "yes") {
          return row[filter.id] == 1;
        } else if (filter.value === "no") {
          return row[filter.id] == 0;
        }
        return true;
      }
    }, {
      Header: 'Donated',
      accessor: 'donated',
      Cell: ({ value }) => (value == 1 ? "Yes" : "No"),
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "yes") {
          return row[filter.id] == 1;
        } else if (filter.value === "no") {
          return row[filter.id] == 0;
        }
        return true;
      }
    }, {
      Header: 'Salary',
      accessor: 'salary',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "a") {
          return row[filter.id] < 9526;
        } else if (filter.value === "b") {
          return row[filter.id] > 9526 && row[filter.id] < 38700;
        } else if (filter.value === "c") {
          return row[filter.id] >= 38701 && row[filter.id] < 82500;
        } else if (filter.value === "d") {
          return row[filter.id] >= 82501 && row[filter.id] < 157500;
        } else if (filter.value === "e") {
          return row[filter.id] >= 157501 && row[filter.id] < 200000;
        } else if (filter.value === "f") {
          return row[filter.id] >= 200001 && row[filter.id] < 500000;
        } else if (filter.value === "g") {
          return row[filter.id] > 500000;
        }
        return true;
      },
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="a">Less than $9,526</option>
          <option value="b">$9,526 to $38,700</option>
          <option value="c">$38,701 to $82,500</option>
          <option value="d">$82,501 to $157,500</option>
          <option value="e">$157,501 to $200,000</option>
          <option value="f">$200,001 to $500,000</option>
          <option value="g">More than $500,000</option>
        </select>
      )
    }, {
      Header: 'Will Donate?',
      accessor: 'prediction',
      Cell: ({ value }) => (value <= 0.33 ? "Not Likely" : value <= 0.66 ? "Moderately Likely" : "Likely"),
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="a">Not Likely</option>
          <option value="b">Moderately Likely</option>
          <option value="c">Likely</option>
        </select>
      ),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "a") {
          return row[filter.id] >= 0 && row[filter.id] <= 0.33;
        } else if (filter.value === "b") {
          return row[filter.id] > 0.33 && row[filter.id] <= 0.66;
        } else if (filter.value === "c") {
          return row[filter.id] > 0.66 && row[filter.id] <= 1.0;
        }
        return true;
      },
      getProps: (state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
          return {
            style: {
              color:
                (rowInfo.row.prediction <= 0.33 ? "red" : rowInfo.row.prediction <= 0.66 ? "orange" : "green"),
              'fontWeight': '700'
            }
          };
        } else {
          return {};
        }
      }
    }];

    const filterMethod = (filter, row) => {
      return String(row[filter.id]) === filter.value;
    }

    return <ReactTable filterable
                       defaultFilterMethod={filterMethod}
                       defaultPageSize={25}
                       className="data-table"
                       data={this.state.data}
                       columns={columns} />
  }

  render() {
    const page = this.props.page;

    if (page == 'data') {
      return this.dataPage()
    } else if (page == 'about') {
      return (
        <div className='paragraph-box'>
          <h1> About </h1>
          <p>Donation Station aims to help Make-A-Wish easily and efficiently reach out to donor and volunteer prospects. The search for donors can be bolstered by the use of machine learning
            and data science, <span className="bold italic">but it doesn't have to be intimidating!</span> Donation Station is a simple, user friendly, and easy to use application that allows Make-A-Wish to quickly search for and
            get in contact with prospective donors and volunteers. <span className="bold italic">We handle the technical stuff, you take care of the rest!</span></p>

          <p> When given simple data on prospective donors, Donation Station outputs likelihoods of the prospects to donate based on learned tendencies in training datasets. From the main data page,
           <span className="bold italic"> it's easy to identify high-likelihood prospects and reach out immediately!</span> In addition, <span className="bold italic">our Insights platform allows for efficient identification of volunteers through similar means.</span> </p>

          <br></br>
          <br></br>
          <br></br>

          <img className="center" src={ require('./assets/support.png') } />

          <h1> Methodology </h1>

          <h2 className="bold italic"> So how does the magic happen? </h2>

          <p> <span className="bold italic">Donation Station operates with scalability at its forefront.</span> Behind a beautiful user interface is a data analysis engine that can accept data on an at-will basis in order to better
            learn who may be a match for Make-A-Wish. By learning both intrinsic and extrinsic correlations between prospective donor attributes and propensity to donate, <span className="bold italic">Donation Station is able
            to recommend smart decisions without much user guidance, so Make-A-Wish can focus on what really matters.</span>
          </p>

          <br></br>
          <br></br>
          <br></br>

          <img className="center" src={ require('./assets/cloud-computing.png') } />

          <h1>The Technical Stuff (bleh!)</h1>

          <p>We made sure to really understand the domain of data that Make-A-Wish could acquire and utilize before getting down to the machine learning. We focused on attributes such as age, occupation,
            and previous donations (to name a few) to input to our models for prediction. The models we used are as follows:
          </p>

          <ul class="bold italic">
            <li>Neural Networks</li>
            <li>Decision Trees/Random Forests</li>
            <li>Logistic Regression</li>
            <li>K Nearest Neighbors (KNN)</li>
          </ul>

          <p>We hope that Make-A-Wish can use our application in combination with their large data stores on prospective and previous donors to make smart decisions. We're excited to
            add more functionality such as <span className="bold italic">continuous data integration</span>, <span className="bold italic">a more intelligent insights platform</span>, <span className="bold italic"> and performance metrics</span> in the future.
          </p>

          <br></br>
          <br></br>
          <br></br>

          <img className="center" src={ require('./assets/computer.png') } />


          <p>
          <br></br>
          <br></br>
          <hr></hr>

            Made by Rajiv Anisetti, Sanketh Hegde, Raymond Kwan, Kareem Nosseir, and Ritesh Pendekanti at Hack-A-Wish 2019!
          </p>
        </div>
      );
    } else if (page == 'how to use') {
      return (

        <div>

          <br></br><br></br>
          <div class="row">
            <div class="column-left">
              <h1>Data Analysis Platform</h1>


              <p>Our data analysis platform is designed to be extremely easy to use! Simply select a model (or default to Random Forest Classifier) and click <span className="bold italid"> Go!</span></p>
              <p>From here, feel free to take a look at each of the prospective donors and use the <span className="italic bold"> Contact </span> button to reach out!</p>
            </div>
            <div class="column">
              <br></br><br></br>
              <img className="center" src={ require('./assets/graph.png') } />
            </div>
          </div>

          <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

          <div class="row">
            <div class="column-left">
              <h1>Insights Platform</h1>


              <p>Our data analysis platform is designed to be extremely easy to use! Simply select a model (or default to Random Forest Classifier) and click <span className="bold italid"> Go!</span></p>
              <p>From here, feel free to take a look at each of the prospective donors and use the <span className="italic bold"> Contact </span> button to reach out!</p>
            </div>
            <div class="column">
              <br></br><br></br>
              <img className="center" src={ require('./assets/stadistics.png') } />
            </div>
          </div>

          <p className="margin-left">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <hr></hr>

            Made by Rajiv Anisetti, Sanketh Hegde, Raymond Kwan, Kareem Nosseir, and Ritesh Pendekanti at Hack-A-Wish 2019!
          </p>
        </div>
      );
    } else if (page == 'insights') {
      return (<Insights data={this.state.data}/>);
    }
    return (
      <div>DEFAULT</div>
    );
  }
}

export default Main;
