import React, { Component } from "react";
import '../css/ClauseForm.css';
import TerminalWindow from './terminal-window/TerminalWindow';

class ClauseForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            clauseNum : 1,
            inputs    : {},
        };
        this.addClause = this.addClause.bind(this);
        this.deleteClause = this.deleteClause.bind(this);
    }

    addClause (clause) {
        this.setState(prevState => (
            {
                inputs : { ...prevState.inputs, [`clause${prevState.clauseNum}`] : clause },
                clauseNum : prevState.clauseNum + 1
            }
        ));
    }

    deleteClause (clause) {
        let updatedInputs = Object.assign({}, this.state.inputs);
        delete updatedInputs[clause];

        this.setState(prevState => (
            {
                inputs : updatedInputs,
                clauseNum : prevState.clauseNum - 1
            }
        ));
    }

    render () {
        return (
            <div className="graph-input-container">
                <TerminalWindow
                    clauses={this.state.inputs}
                    addClause={this.addClause}
                    deleteClause={this.deleteClause}
                    submitClauses={() => this.props.onSubmit(this.state.inputs)}
                />
            </div> 
        )
    };
}

export default ClauseForm;