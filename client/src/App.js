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
      inputs: [],
      inputIndex: 2
    };
  }

  parseForm(values) {
    let parsedValues = {};
    parsedValues['clause1'] = values['clause1'];
    let clauseIndex = 2;

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

  nextStep() {
    this.setState({
      currentStep: this.state.currentStep+1,
      inputs: [],
      inputIndex: 2
    });
  }

  resetStep() {
    this.setState({currentStep: 0});
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
    const response = await postClauses(this.parseForm(values));
    if(response) {
      this.nextStep();
    }
    else{
      alert("Server failed to give a response. Please try different clauses");
    }
  }

  render() {
    return (
      <div className="graph-input-wrapper">
        {/* { this.state.currentStep === 0 && <ClauseNum onNextClick={() => this.nextStep()}/> } */}
        { this.state.currentStep === 0 && 
          <ClauseForm 
            onNextClick={() => this.nextStep()} 
            inputs={this.state.inputs}
            onAddInput={() => this.appendInput()}
            onDeleteInput={toDelete => this.deleteInput(toDelete)}
            onSubmit={values => this.onSubmit(values)}
          /> 
        }
        { this.state.currentStep === 1 && 
          <ClauseVisualizer 
            onEditClauseClick={() => this.resetStep()}
          /> 
        }
      </div>
    );
  }
}

export default App;