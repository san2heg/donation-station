import React, { Component } from 'react';

class ModelPicker extends React.Component {
  render() {
    return (
      <div className="model-info">
        <div>Learning Model:</div>
        <select
          onChange={this.props.handleModelChange}
          value={this.props.model}
          className="model-item">
          <option value="forest">Random Forest</option>
          <option value="knn">K Nearest Neighbors</option>
          <option value="neuralnet">Neural Network</option>
          <option value="logreg">Logistic Regression</option>
        </select>
        <div className="section-start">Accuracy:</div>
        <div className="percentage">{((1-this.props.mse)*100).toFixed(2)}%</div>
        <div className="section-start">MSE:</div>
        <div className="percentage">{(this.props.mse).toFixed(4)}</div>
      </div>
    );
  }
}

export default ModelPicker;
