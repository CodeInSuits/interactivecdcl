import React, { Component } from 'react';
import TypingText from './TypingText';
import '../../css/terminal-window/CommandLineText.css';

class CommandLineText extends Component {
  constructor (props){
    super(props);
    this.state = {
      userInput   : false,
      currCommand : this.props.commandNum,
    };
    this.userInputRef = React.createRef();
    this.updateUserInputHeight = this.updateUserInputHeight.bind(this);
    this.getUserInput = this.getUserInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidUpdate () {
    if (this.state.userInput && this.userInputRef.current) {
      this.userInputRef.current.addEventListener('input', this.updateUserInputHeight);
    }
  }

  componentWillUnmount () {
    this.userInputRef.current.removeEventListener('input', this.updateUserInputHeight);
  }

  updateUserInputHeight () {
    this.userInputRef.current.style.height = `${this.userInputRef.current.scrollHeight}px`;
  }

  getUserInput () {
    this.setState({ userInput : true });

    if (this.userInputRef.current) {
      this.userInputRef.current.focus();
    }
  }

  handleUserInput (event) {
    // enter
    if (event.keyCode === 13 && !this.userInputRef.current.readOnly) {
      event.preventDefault();
      this.userInputRef.current.blur();
      this.props.handleUserInput(this.userInputRef.current.value);
    }
    // up arrow
    else if (event.keyCode === 38) {
      const prevCommand = this.state.currCommand - 1;
      if (prevCommand >= 0) {
        this.userInputRef.current.value = this.props.commands[prevCommand];
        this.setState(prevState => ({ currCommand : prevState.currCommand - 1 }));
      }
    }
    // down arrow
    else if (event.keyCode === 40) {
      const nextCommand = this.state.currCommand + 1;
      if (nextCommand < this.props.commands.length) {
        this.userInputRef.current.value = this.props.commands[nextCommand];
        this.setState(prevState => ({ currCommand : prevState.currCommand + 1 }));
      }
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
            <textarea
              rows="1"
              spellCheck="false"
              readOnly={!this.props.blink}
              className="command-line-user-input"
              // onKeyPress={this.handleUserInput}
              onKeyDown={this.handleUserInput}
              ref={this.userInputRef}/>
            {/* <div
              className="command-line-user-input"
              contentEditable={this.props.blink}
              onKeyPress={this.handleUserInput}
              ref={this.userInputRef}
            >
            </div> */}
          </div>
        }
      </div>
    );
  }
}

export default CommandLineText;