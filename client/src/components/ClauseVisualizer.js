import React, { Component } from 'react';
import ClauseGraph from './ClauseGraph';
import { Button, Tooltip, Popover, OverlayTrigger, Well, Label } from 'react-bootstrap';
import '../css/ClauseVisualizer.css';


class ClauseVisualizer extends Component {

  constructor(props){
    super(props);
    this.state = {
      clauseStrs: props.clauseInfo.data.clauses,
      graphStrs: props.clauseInfo.data.stepGraphs,
      contIndices: props.clauseInfo.data.contIndices,
      confClauses: props.clauseInfo.data.confClauses,
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

  adjustConflictClauses() {
    let conflictClauses = [];
    let conflictIndex = 0;
    for (let i = 0; i < this.state.contIndices.length-1; i++) {
      if (this.state.contIndices[i]<=this.state.graphIndex) {
        conflictClauses.push(
          <div className="conflict-clause" key={`conflict${conflictIndex}`}>
            <Label bsStyle="warning">{`conflict${conflictIndex+1}`}</Label>
            <Well bsSize="small">{this.state.confClauses[conflictIndex]}</Well>
          </div>
        );
        conflictIndex++
      }
    }
    return conflictClauses;
  }

  prevContinue() {
    for (let i = this.state.contIndices.length-1; i >= 0; i--) {
      if (this.state.contIndices[i]<this.state.graphIndex) {
        // console.log("prev continue to step " + this.state.contIndices[i]);
        this.setState({graphIndex: this.state.contIndices[i]});
        return;
      }
    }
  }

  nextContinue() {
    for (let i = 0; i < this.state.contIndices.length; i++) {
      if (this.state.contIndices[i]>this.state.graphIndex) {
        // console.log("next continue to step " + this.state.contIndices[i]);
        this.setState({graphIndex: this.state.contIndices[i]});
        return;
      }
    }
  }

  render() {
    const resetButtonTooltip = (
      <Tooltip id="resetButtonTooltip">
        Reset all clauses.<strong>Proceed with caution!</strong>
      </Tooltip>
    );
    const prevButtonTooltip = (
      <Tooltip id="prevButtonTooltip">
        Go to previous decision diagram.
      </Tooltip>
    );
    const prevContButtonTooltip = (
      <Tooltip id="prevContButtonTooltip">
        Go to previous conflict level.
      </Tooltip>
    );
    const nextButtonTooltip = (
      <Tooltip id="nextButtonTooltip">
        Go to next decision diagram.
      </Tooltip>
    );
    const nextContButtonTooltip = (
      <Tooltip id="nextContButtonTooltip">
        Go to next conflict level.
      </Tooltip>
    );
    const resultPopover = (
      <Popover id="resultButtonTooltip" title="Solver Result">
        {`These CNF clauses have a result of ${this.state.isSat ? "SAT" : "UNSAT"}`}
      </Popover>
    );
    return (
      <div className="clause-visualizer">
        <div className="clause-strs-wrapper">
          <div className="clause-strs-container">
            <div className="clause-strs">
              {this.adjustConflictClauses()}
              {Object.entries(this.state.clauseStrs).map(([key, value]) => 
                <div className="clause-pair" key={key}>
                  <Label bsStyle="info">{key}</Label>
                  <Well bsSize="small">{value}</Well>
                </div>
              )}
            </div>
            <div className="clause-strs-button-container">
              <OverlayTrigger placement="top" overlay={resetButtonTooltip}>
                <Button 
                  bsStyle="primary" 
                  onClick={this.props.onResetClauseClick}>
                  Reset clause
                </Button>
              </OverlayTrigger>
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
                <OverlayTrigger placement="top" overlay={prevContButtonTooltip}>
                  <Button 
                    bsStyle="primary" 
                    onClick={() => this.prevContinue()}
                    disabled={this.state.graphIndex<=this.state.contIndices[0]}>
                    {'<< Prev Continue'}
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                <OverlayTrigger placement="top" overlay={prevButtonTooltip}>
                  <Button 
                    bsStyle="primary" 
                    onClick={() => this.prevStep()} 
                    disabled={this.state.graphIndex===0}>
                    {'< Prev Step'}
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                <OverlayTrigger placement="top" trigger="click" overlay={resultPopover}>
                  <Button bsStyle="primary">
                    {'Reveal Result'}
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                <OverlayTrigger placement="top" overlay={nextButtonTooltip}>
                  <Button 
                    bsStyle="primary" 
                    onClick={() => this.nextStep()} 
                    disabled={this.state.graphIndex===(this.state.graphStrs.length-1)}>
                    {'Next Step >'}
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                <OverlayTrigger placement="top" overlay={nextContButtonTooltip}>
                  <Button 
                    bsStyle="primary" 
                    onClick={() => this.nextContinue()} 
                    disabled={this.state.graphIndex>=this.state.contIndices[this.state.contIndices.length-1]}>
                    {'Next Continue >>'}
                  </Button>
                </OverlayTrigger>          
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClauseVisualizer;