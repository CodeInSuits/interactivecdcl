import React, { Component } from 'react';
import TypingText from './TypingText';
import '../../css/terminal-window/CommandLineText.css';

class CommandLineText extends Component {
  constructor (props){
    super(props);
    this.state = {
      userInput : false,
    };
    this.userInputRef = React.createRef();
    this.getUserInput = this.getUserInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  getUserInput () {
    this.setState({ userInput : true });
    this.userInputRef.current.focus();
  }

  handleUserInput (event) {
    if (event.charCode === 13) {
      event.preventDefault();
      this.userInputRef.current.blur();
      this.props.handleUserInput(this.userInputRef.current.innerHTML);
    }
  }

  render () {
    return (
      <div className="command-line-text">
        <TypingText
          text={this.props.prompt}
          doneTyping={this.getUserInput}
        />
        {this.state.userInput &&
          <div style={{ position : 'relative' }}>
            <div style={{ position : 'absolute', display : 'inline-block'}}>
              >
            </div>
            <div
              className="command-line-user-input"
              contentEditable={this.props.blink}
              onKeyPress={this.handleUserInput}
              ref={this.userInputRef}>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default CommandLineText;