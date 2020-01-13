import React, { Component } from "react";
import "../../css/terminal-window/TerminalWindow.css";
import CommandLineText from './CommandLineText';

class TerminalWindow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prompts : [`Welcome to Interactive CDCL!
      \n
      To skip introduction/text animation, press Enter key.
      \n
      To add a clause, type 'add [CLAUSE]' (e.g. add x1 or not x2 or x5).
      \n
      To remove a clause, type 'del [CLAUSE_LABEL]' (e.g. del clause3). Note clauses will be reordered after deletion.
      \n
      To list current clauses you have, type 'list'.
      \n
      Once you're done, type 'run' to compute current clauses and visualize the implication graph.
      \n
      If you need help, type 'help'.`],
      commands : [],
    }
    this.validateUserInput = this.validateUserInput.bind(this);
  }

  validateUserInput (value) {
    const validClause = /^ *(?:not )?x\d+(?: or (?:not )?x\d+)* *$/;
    const parsedValue = value.trim().split(/\s+/);
    const command = parsedValue[0].toLowerCase();

    this.setState(prevState => ({ commands : [...prevState.commands, value]}));

    if (value.trim().toLowerCase() === 'run') {
      if (JSON.stringify(this.props.clauses) === '{}') {
        this.setState(prevState => ({ prompts : [...prevState.prompts, "Can't build a graph with zero clauses."] }));
      }
      else {
        this.props.submitClauses();
      }
    }

    else if (command === 'add') {
      const clauses = parsedValue.slice(1);
      const clause = clauses.join(' ');

      // console.log(clause)


      if (!clause || clause.replace(/\s/g, '').length === 0) {
        this.setState(prevState => ({ prompts : [...prevState.prompts, "Clause input field cannot be empty!"] }));
      }
      else {
        if (validClause.test(clause)) {
          this.setState(prevState => ({ prompts : [...prevState.prompts, `Clause '${clause}' added!`] }));
          this.props.addClause(clause);
        }
        else {
            this.setState(prevState => ({ prompts : [...prevState.prompts, "Make sure to use all lower case letters, all your variables begin with x, end with a positive integer and since it's CNF form, you can only use 'not' and 'or' in your clauses!"] }));
        }
      }
    }

    else if (command === 'del') {
      let toDelete = parsedValue[1];
      if (toDelete) {
        if (this.props.clauses[toDelete]) {
          const clauseToDelete = this.props.clauses[toDelete];
          this.props.deleteClause(toDelete);
          this.setState(prevState => ({ prompts : [...prevState.prompts, `Clause ${clauseToDelete} has been deleted! Your current clauses have been reordered.`] }));
        }
        else {
          this.setState(prevState => ({ prompts : [...prevState.prompts, "Invalid clause label. Use command 'list' to check available clause label you have."] }));
        }
      }
      else {
        this.setState(prevState => ({ prompts : [...prevState.prompts, "Invalid delete clause command. You need to specify a clause label(e.g. del clause3)."] }));
      }
    }

    else if (value.trim().toLowerCase() === 'list') {
      this.setState(prevState => ({ prompts : [...prevState.prompts, JSON.stringify(this.props.clauses)] }));
    }

    else if (value.trim().toLowerCase() === 'help') {
      const helpInfo = `To skip text animation, press Enter key.
      \n
      To add a clause, type 'add [CLAUSE]' (e.g. add x1 or not x2 or x5).
      \n
      To remove a clause, type 'del [CLAUSE_LABEL]' (e.g. del clause3). Note clauses will be reordered after deletion.
      \n
      To list current clauses you have, type 'list'.
      \n
      Once you're done, type 'run' to compute current clauses and visualize the implication graph.
      \n
      If you need help, type 'help'.`;
      this.setState(prevState => ({ prompts : [...prevState.prompts, helpInfo] }));
    }

    else {
      this.setState(prevState => ({ prompts : [...prevState.prompts, "Invalid command. Type 'help' to see your available options."] }));
    }
  }

  render () {
    return (
      <div className="terminal-window-container">
        <div className="terminal-window-header">
            <div className="title">
                Interactive CDCL
            </div>
        </div>
        <div className="terminal-window">
            {this.state.prompts.map((prompt, index) =>
              <CommandLineText
                key={`prompt-${index}`}
                prompt={prompt}
                commandNum={index}
                commands={this.state.commands}
                blink={index === this.state.prompts.length - 1}
                handleUserInput={this.validateUserInput}
              />
            )}
        </div>
      </div>
    );
  }
}

export default TerminalWindow;