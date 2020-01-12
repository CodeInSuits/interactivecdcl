import React, { Component } from 'react';
import './App.css';
import ClauseForm from './components/ClauseForm';
// import ClauseNum from './components/ClauseNum';
import ClauseVisualizer from './components/ClauseVisualizer';
import { postClauses } from './utils/restClient';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentStep: 0,
      serverResponse: null,
    };
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

  handleUserInput (userInput) {
    // console.log(userInput)
  }

  async onSubmit(values) {
    const response = await postClauses(values);
    // const response = await postClauses(this.parseForm(values));
    if(response.data.status==='success') {
      // console.log(response)
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