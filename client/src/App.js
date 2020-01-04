import React, { Component } from 'react';
import './App.css';
import { ClauseForm } from './components/ClauseForm';
// import ClauseNum from './components/ClauseNum';
import ClauseVisualizer from './components/ClauseVisualizer';
import { postClauses } from './utils/restClient';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentStep: 0,
      inputs: []
    };
  }

  async sendToServer(values) {
    console.log('input is ',values);
    const response = await postClauses(values);
    return response;
  }

  nextStep() {
    this.setState({
      currentStep: this.state.currentStep+1,
      inputs: [],
    });
  }

  resetStep() {
    this.setState({currentStep: 0});
  }

  appendInput() {
    var newInput = `clause${this.state.inputs.length+2}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  }

  async onSubmit(values) {
    const response = await this.sendToServer(values);
    if(response) {
      this.nextStep();
    }
    else{
      alert("Server failed to give a response. Please try different clauses");
    }
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
            inputs={this.state.inputs}
            onAddInput={() => this.appendInput()}
            onSubmit={values => this.onSubmit(values)}
          /> 
        }
        { this.state.currentStep === 1 && <ClauseVisualizer onEditClauseClick={() => this.resetStep()}/> }
      </div>
    );
  }
}

export default App;