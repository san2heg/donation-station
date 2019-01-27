import React, { Component } from 'react';
import './Insights.css';

import ModelPicker from './ModelPicker.js';

var BarChart = require("react-chartjs").Bar;
var PieChart = require("react-chartjs").Pie;

class Insights extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    /* AGES BAR GRAPH */

    const ageLabels = ["0-20", "21-35", "36-50", "50+"];
    const ageTotals = [0,0,0,0];
    const ageDonated = [0,0,0,0];

    let donorUnlikely = 0;
    let donorModerate = 0;
    let donorLikely = 0;

    for (let person of this.props.data) {
      let index=-1;
      if (person.ages >= 0 && person.ages <= 20) {
        ageTotals[0]++;
        index=0;
      }
      else if (person.ages >= 21 && person.ages <= 35) {
        ageTotals[1]++;
        index=1;
      }
      else if (person.ages >= 36 && person.ages <= 50) {
        ageTotals[2]++;
        index=2;
      }
      else if (person.ages >= 51) {
        ageTotals[3]++;
        index=3;
      }
      ageTotals[index]++;
      if (person.prediction >= 0.75) {
        ageDonated[index]++;
      }

      if (person.prev_donor) {
        if (person.prediction <= 0.33) {
          donorUnlikely++;
        } else if (person.prediction <= 0.75) {
          donorModerate++;
        } else {
          donorLikely++;
        }
      }
    }

    const ageData = [0,0,0,0];
    for (let i = 0; i < 4; i++) {
      ageData[i] = ageTotals[i] ? ageDonated[i] / ageTotals[i] : 0;
    }

    const chart1Data = {
    	labels: ageLabels,
    	datasets: [
    		{
    			label: "Proportion of Ages who are Likely to Donate",
    			fillColor: "rgb(83,124,142,0.6)",
    			strokeColor: "rgb(83,124,142,0.0)",
    			highlightFill: "rgba(83,124,142,0.75)",
    			highlightStroke: "rgba(83,124,142,0.0)",
    			data: ageData
    		}
    	]
    };

    /* DONORS PIE GRAPH */

    let chart2Data = [
    	{
    		value: donorLikely,
    		color:"rgba(206,174,127,0.6)",
    		highlight: "rgba(206,174,127,0.75)",
    		label: "Likely"
    	},
    	{
    		value: donorModerate,
    		color: "rgba(83,124,142,0.6)",
    		highlight: "rgba(83,124,142,0.75)",
    		label: "Moderately Likely"
    	},
    	{
    		value: donorUnlikely,
    		color: "rgba(133,88,63,0.6)",
    		highlight: "rgba(133,88,63,0.75)",
    		label: "Unlikely"
    	}
    ];

    let piechartOptions = {
      animationEasing : "easeOutQuad",
      segmentShowStroke : true,
      segmentStrokeColor : "#f2f2f2"
    }

    return (
      <div>
        <ModelPicker handleModelChange={this.props.handleModelChange} model={this.props.model} mse={this.props.mse} />
        <div className="charts-container">
          <div className="chart-item">
            <BarChart data={chart1Data} width="400" height="250" />
            <div className="chart-caption">Proportion of Ages who are Likely to Donate</div>
          </div>
          <div className="chart-item">
            <PieChart data={chart2Data} options={piechartOptions} width="400" height="250"/>
            <div className="chart-caption">Previous Donors' Likeliness to Donate</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Insights;
