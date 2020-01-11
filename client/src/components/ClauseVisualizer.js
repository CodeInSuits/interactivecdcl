import React, { Component } from 'react';
import ClauseGraph from './ClauseGraph';
import { Button } from 'react-bootstrap';
import '../css/ClauseVisualizer.css';


class ClauseVisualizer extends Component {

  constructor(props){
    super(props);
    this.state = {
      clauseStrs: props.clauseInfo.data.clauses,
      graphStrs: props.clauseInfo.data.stepGraphs,
      contIndices: props.clauseInfo.data.contIndices,
      isSat: props.clauseInfo.data.isSat,
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
    // if (this.state.graphIndex===(this.state.graphStrs.length-1)) {
    //   alert(this.state.isSat ? 'SAT' : 'UNSAT');
    // }
    return (
      <div className="clause-visualizer">
        <div className="clause-strs-wrapper">
          <div className="clause-strs-container">
            <div className="clause-strs">
              {Object.entries(this.state.clauseStrs).map(([key, value]) => 
                <div key={key}>
                  <label>{key}</label>&nbsp;&nbsp;&nbsp;
                  <label>{value}</label>
                </div>
              )}
            </div>
            <div className="clause-strs-button-container">
              <Button 
                bsStyle="primary" 
                title="Reset all clauses"
                onClick={this.props.onResetClauseClick}>
                Reset clause
              </Button>
            </div>
          </div>
        </div>
        <div className="graph-wrapper">
          <div className="graph-container">
            <ClauseGraph 
              className="graph"
              dotStr={this.state.graphStrs[this.state.graphIndex]}
            />
            <div className="graph-button-container">    
              <div>
                <Button 
                  bsStyle="primary" 
                  onClick={() => this.prevContinue()} 
                  title="Go to previous conflict level"
                  disabled={this.state.graphIndex<=this.state.contIndices[0]}>
                  {'<< Prev Continue'}
                </Button>
              </div>
              <div>
                <Button 
                  bsStyle="primary" 
                  onClick={() => this.prevStep()} 
                  title="Go to previous step"
                  disabled={this.state.graphIndex===0}>
                  {'< Prev Step'}
                </Button>
              </div>
              <div>
                <Button 
                  bsStyle="primary" 
                  onClick={() => this.nextStep()} 
                  title="Go to next step"
                  disabled={this.state.graphIndex===(this.state.graphStrs.length-1)}>
                  {'Next Step >'}
                </Button>
              </div>
              <div>
                <Button 
                  bsStyle="primary" 
                  onClick={() => this.nextContinue()} 
                  title="Go to next conflict level"
                  disabled={this.state.graphIndex>=this.state.contIndices[this.state.contIndices.length-1]}>
                  {'Next Continue >>'}
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