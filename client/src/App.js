import React, { Component } from 'react';
import './App.css';
import { ClauseForm } from './components/ClauseForm';
import ClauseNum from './components/ClauseNum';
import ClauseVisualizer from './components/ClauseVisualizer';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  nextStep() {
    this.setState({currentStep: this.state.currentStep+1});
  }

  prevStep() {
    this.setState({currentStep: this.state.currentStep-1});
  }

  resetStep() {
    this.setState({currentStep: 0});
  }

  render() {
    return (
      <div className="graph-input-wrapper">
        { this.state.currentStep == 0 && <ClauseNum onNextClick={() => this.nextStep()}/> }
        { this.state.currentStep == 1 && <ClauseForm onNextClick={() => this.nextStep()} onPrevClick={() => this.prevStep()}/> }
        { this.state.currentStep == 2 && <ClauseVisualizer onEditClauseClick={() => this.resetStep()}/> }
      </div>
    );
  }
}

export default App;