import React, { Component } from 'react';
import Graph from './Graph';
import { Button } from 'react-bootstrap';
import '../css/ClauseVisualizer.css';


class ClauseVisualizer extends Component {

  constructor(props){
    super(props);
    this.state = {
      clauseStrs: props.clauseInfo.data.clauses,
      graphStrs: props.clauseInfo.data.stepGraphs,
      contIndices: props.clauseInfo.data.contIndices,
      graphIndex: 0
    };
  }

  prevStep() {
    this.setState(prevState => ({ 
      graphIndex: prevState.graphIndex - 1
    }));
  }

  nextStep() {
    this.setState(prevState => ({ 
      graphIndex: prevState.graphIndex + 1
    }));
  }

  prevContinue() {
    for (let i = this.state.contIndices.length-1; i >= 0; i--) {
      if (this.state.contIndices[i]<this.state.graphIndex) {
        console.log("prev continue to step " + this.state.contIndices[i]);
        this.setState({graphIndex: this.state.contIndices[i]});
        return;
      }
    }
  }

  nextContinue() {
    for (let i = 0; i < this.state.contIndices.length; i++) {
      if (this.state.contIndices[i]>this.state.graphIndex) {
        console.log("next continue to step " + this.state.contIndices[i]);
        this.setState({graphIndex: this.state.contIndices[i]});
        return;
      }
    }
  }

  render() {
      return (
        <div className="clause-visualizer">
          <div className="clause-strs-wrapper">
            <div className="clause-strs-container">
              {Object.entries(this.state.clauseStrs).map(([key, value]) => 
                <div key={key}>
                  <label>{key}</label>&nbsp;&nbsp;&nbsp;
                  <label>{value}</label>
                </div>
              )}
            </div>
            <div className="clause-strs-button-container">
              <Button bsStyle="primary" onClick={this.props.onResetClauseClick}>
                Reset clause
              </Button>
            </div>
          </div>
          <div className="graph-wrapper">
            <div className="graph-container">
              <Graph 
                className="graph"
                dotStr={this.state.graphStrs[this.state.graphIndex]}
              />
              <div className="graph-button-container">    
                <div>
                  <Button bsStyle="primary" onClick={() => this.prevContinue()} disabled={this.state.graphIndex<=this.state.contIndices[0]}>
                    Prev Continue
                  </Button>
                </div>
                <div>
                  <Button bsStyle="primary" onClick={() => this.prevStep()} disabled={this.state.graphIndex===0}>
                    Prev step
                  </Button>
                </div>
                <div>
                  <Button bsStyle="primary" onClick={() => this.nextStep()} disabled={this.state.graphIndex===(this.state.graphStrs.length-1)}>
                    Next step
                  </Button>
                </div>
                <div>
                  <Button bsStyle="primary" onClick={() => this.nextContinue()} disabled={this.state.graphIndex>=this.state.contIndices[this.state.contIndices.length-1]}>
                    Next Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ClauseVisualizer;