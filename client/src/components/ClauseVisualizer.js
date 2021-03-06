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
      contIndices: props.clauseInfo.data.contIndices.slice(0, props.clauseInfo.data.contIndices.length - 1),
      confClauses: props.clauseInfo.data.confClauses,
      isSat: props.clauseInfo.data.isSat,
      graphIndex: 0,
    };
    this.clauseRef = React.createRef();
    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);
    this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;

    this.conflictRefs = [];

    for (let i = 0; i < props.clauseInfo.data.contIndices.length - 1; i++) {
      this.conflictRefs.push(React.createRef());
    }
  }

  componentDidMount () {
    this.clauseRef.current.onmousedown = this.dragMouseDown;
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.graphIndex !== this.state.graphIndex) {
      const position = this.state.contIndices.indexOf(this.state.graphIndex);
      if (position >= 0) {
        this.conflictRefs[position].current.scrollIntoView();
      }
    }
  }

  dragMouseDown (e) {
    e = e || window.event;
    e.preventDefault();
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    document.onmousemove = this.elementDrag;
  }

  elementDrag (e) {
    e = e || window.event;
    e.preventDefault();
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.clauseRef.current.style.top = (this.clauseRef.current.offsetTop - this.pos2) + "px";
    this.clauseRef.current.style.left = (this.clauseRef.current.offsetLeft - this.pos1) + "px";
  }

  closeDragElement () {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
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
        <div className="clause-strs-wrapper" ref={this.clauseRef}>
          <div className="clause-strs-container-header">
              <div className="title">
                Clauses
              </div>
          </div>
          <div className="clause-strs-container">
            <div className="clause-strs">
              {Object.entries(this.state.clauseStrs).map(([key, value]) => 
                <div className="clause-pair" key={key}>
                  <Label bsStyle="info">{key}</Label>
                  <Well bsSize="small">{value}</Well>
                </div>
              )}
              { this.state.contIndices.map((clause, index) =>
                <div style={{ visibility : clause > this.state.graphIndex ? 'hidden' : 'initial', height : clause > this.state.graphIndex ? '0' : 'auto' }} 
                     className="conflict-clause" 
                     key={`conflict${index}`} 
                     ref={this.conflictRefs[index]}>
                  <Label bsStyle="warning">
                    {`conflict - clause${Object.entries(this.state.clauseStrs).length+index+1}`}
                  </Label>
                  <Well bsSize="small">{this.state.confClauses[index]}</Well>
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
          <div className="graph-container-header">
              <div className="title">
                Interactive CDCL | Results
              </div>
          </div>
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
                    disabled={this.state.contIndices.length===0 || this.state.graphIndex<=this.state.contIndices[0]}>
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
                    disabled={this.state.contIndices.length===0 || this.state.graphIndex>=this.state.contIndices[this.state.contIndices.length-1]}>
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