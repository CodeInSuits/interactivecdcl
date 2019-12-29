import React, { Component } from 'react';
import '../css/ClauseNum.css';

class ClauseNum extends Component {
  constructor(props){
    super(props);
    this.state = {
      numClauses : 1,
      nodeColors : ['#494947'],
      colors : ['#494947', '#35FF69', '#44CCFF', '#7494EA', '#D138BF' ],
      colorIndex : 0,
    };
  }

  adjustNumClauses (increase) {
    if (increase) {
      this.setState(prevState => (
        {
          nodeColors : [...prevState.nodeColors,
          prevState.colors[prevState.colorIndex % 4]],
          colorIndex : prevState.colorIndex + 1,
          numClauses : prevState.numClauses + 1,
        })
      );
    }
    else {
      if (this.state.numClauses >= 1) {
        this.state.nodeColors.pop();
        this.setState(prevState => (
          {
            nodeColors : prevState.nodeColors,
            colorIndex : prevState.colorIndex - 1,
            numClauses : prevState.numClauses - 1,
          })
        );
      }
    }
  }

  changeNumClauses (event) {
    const num = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value;
    let newNodeColors = [];

    for (let i = 0; i < num; i++) {
      newNodeColors.push(this.state.colors[i % 4]);
    }

    this.setState(prevState => (
      {
        nodeColors : newNodeColors,
        colorIndex : num,
        numClauses : num
      })
    );
    this.setState({ numClauses : event.target.type === 'number' ? parseInt(event.target.value) : event.target.value });
  }

  render() {
    return (
      <div className="graph-input-container">
        <h3>Number of clauses</h3>
        <div className="num-clauses-container">
          <button disabled={this.state.numClauses===1} className="quantity-button" onClick={() => this.adjustNumClauses(false) }>-</button>
          <div className="quantity">
            <input className="quantity-input" type="number" value={this.state.numClauses} onChange={(event) => this.changeNumClauses(event)} readOnly/>
          </div>
          <button disabled={this.state.numClauses===20} className="quantity-button" onClick={() => this.adjustNumClauses(true) }>+</button>
        </div>
        <div className="node-container">
          { this.state.nodeColors.map((color, index) => {
            return <div className="node" style={{ backgroundColor : color }}>
                X<sub>{ index + 1 }</sub>
              </div>
          }) }
        </div>
        <button className="next-button" onClick={this.props.onNextClick}>Next Step</button>
      </div>
    );
  }
}

export default ClauseNum;