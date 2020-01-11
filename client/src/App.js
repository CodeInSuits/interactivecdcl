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
      inputs: ['clause1'],
      inputIndex: 2,
      serverResponse: null,
    };
  }

  parseForm(values) {
    let parsedValues = {};
    let clauseIndex = 1;

    for (let i = 0; i < this.state.inputs.length; i++)
    {
      let input = this.state.inputs[i];

      if (values[input])
      {
        parsedValues[`clause${clauseIndex++}`] = values[input];
      }
    }

    return parsedValues;
  }

  visualizeClauses(serverResponse) {
    this.setState({
      currentStep: this.state.currentStep+1,
      serverResponse
    });
  }

  resetClauses() {
    this.setState({
      currentStep: 0,
      inputs: ['clause1'],
      inputIndex: 2,
      serverResponse: null
    });
  }

  appendInput() {
    var newInput = `clause${this.state.inputIndex}`;
    this.setState(prevState => ({ 
      inputs: prevState.inputs.concat([newInput]),
      inputIndex: prevState.inputIndex+1
    }));
  }

  deleteInput(toDelete) {
    const inputsToUpdate = [...this.state.inputs];
    const indexToDelete = inputsToUpdate.indexOf(toDelete);
    if (indexToDelete > -1) {
      inputsToUpdate.splice(indexToDelete, 1);
    }
    this.setState({inputs: inputsToUpdate});
  }

  async onSubmit(values) {
    if(this.state.inputs.length===0) {
      alert('Need at least one clause to proceed to next step!');
      return;
    }
    const response = await postClauses(this.parseForm(values));
    if(response.data.status==='success') {
      console.log(response)
      this.visualizeClauses(response);
    }
    else{
      alert("Server failed to give a response with an error message: " + response.data.error + ". Please try different clauses!");
    }
  }

  render() {
    return (
      <div className="graph-input-wrapper">
        {/* { this.state.currentStep === 0 && <ClauseNum onNextClick={() => this.nextStep()}/> } */}
        { this.state.currentStep === 0 && 
          <ClauseForm 
            inputs={this.state.inputs}
            onAddInput={() => this.appendInput()}
            onDeleteInput={toDelete => this.deleteInput(toDelete)}
            onSubmit={values => this.onSubmit(values)}
          /> 
        }
        { this.state.currentStep === 1 && !!this.state.serverResponse &&
          <ClauseVisualizer 
            clauseInfo={this.state.serverResponse}
            onResetClauseClick={() => this.resetClauses()}
          /> 
        }
      </div>
    );
  }
}

export default App;