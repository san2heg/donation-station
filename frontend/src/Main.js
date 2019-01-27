import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'

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
      Header: 'Prediction',
      accessor: 'prediction',
      Cell: ({ value }) => (value == 1 ? "Will Donate" : "Will Not Donate"),
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="yes">Will Donate</option>
          <option value="no">Will Not Donate</option>
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
            it's easy to identify high-likelihood prospects and reach out immediately! In addition, our Insights platform allows for efficient identification of volunteers through similar means. </p>
          
          <h1> Methodology </h1>

          <p> So how does the magic happen? </p>

          <p> Donation Station operates with scalabality at its forefront. Behind a beautiful user interface is a data analysis engine that can accept data on an at-will basis in order to better 
            learn who may be a match for Make-A-Wish. By learning both intrinsic and extrinsic correlations between prospective donor attributes and propensity to donate, Donation Station is able
            to recommend smart decisions without much user guidance, so Make-A-Wish can focus on what really matters.
          </p>

          <h1>The Technical Stuff (bleh!)</h1>

          <p>We made sure to really understand the domain of data that Make-A-Wish could acquire and utilize before getting down to the machine learning. We focused on attributes such as age, occupation, 
            and previous donations (to name a few) to input to our models for prediction. The models we used are as follows:
          </p>

          <ul>
            <li>Neural Networks</li>
            <li>Decision Trees/Random Forests</li>
            <li>Logistic Regression</li>
            <li>K Nearest Neighbors (KNN)</li>
          </ul>




            
           <p> Allowing the input of database csv files, which Make-A-Wish could data stores on previous donors and prospective donors, the Donation Station the Donation Station aims to bridge the gap between data analysis and is ineffective and We use several machine learning models, including Neural Networks,
            Random Forest Classifiers, K-Nearest-Neighbors (KNN), and Logistic Regression. We take care of all the technical details, so it's easy for you to find prospective donors!

            <br></br>
            <br></br>
            <hr></hr>

            Made by Rajiv Anisetti, Sanketh Hegde, Raymond Kwan, Kareem Nosseir, and Ritesh Pendekanti at Hack-A-Wish 2019!
          </p>
        </div>
      );
    } else if (page == 'how to use') {
      return (
        <div></div>
      );
    } else if (page == 'insights') {
      return (
        <div></div>
      );
    }
    return (
      <div>DEFAULT</div>
    );
  }
}

export default Main;
