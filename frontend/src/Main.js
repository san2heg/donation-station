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
              'font-weight': '700'
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
        <div></div>
      );
    } else if (page == 'how to use') {
      return (
        <div></div>
      );
    } else if (page == 'insights') {
      return <Insights />;
    }
    return (
      <div>DEFAULT</div>
    );
  }
}

export default Main;
