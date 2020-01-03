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
      inputs: []
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

  appendInput() {
    var newInput = `clause${this.state.inputs.length+2}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  }

  // removeInput(inputToRemove) {
  //   this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  // }

  render() {
    return (
      <div className="graph-input-wrapper">
        {/* { this.state.currentStep === 0 && <ClauseNum onNextClick={() => this.nextStep()}/> } */}
        { this.state.currentStep === 0 && 
          <ClauseForm 
            onNextClick={() => this.nextStep()} 
            onPrevClick={() => this.prevStep()} 
            inputs={this.state.inputs}
            onAddInput={() => this.appendInput()}
          /> 
        }
        { this.state.currentStep === 1 && <ClauseVisualizer onEditClauseClick={() => this.resetStep()}/> }
      </div>
    );
  }
}

export default App;