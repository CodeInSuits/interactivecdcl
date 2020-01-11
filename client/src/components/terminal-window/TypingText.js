import React, { Component } from 'react';

class TypingText extends Component {
  constructor (props){
    super(props);
    this.state = {
      typedText : '',
      fullText : this.props.text,
      index : 0,
      timeOuts : [],
    };
    this.textRef = React.createRef();
    this.typingText = this.typingText.bind(this);
    this.showFullText = this.showFullText.bind(this);
  }

  componentDidMount () {
    this.typingText();
    document.addEventListener('keydown', this.showFullText);
  }

  componentDidUpdate () {
    this.textRef.current.scrollIntoView();
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.showFullText);
  }

  typingText () {
    if (this.state.index < this.props.text.length) {
      this.setState(prevState => (
        {
          typedText : prevState.typedText + prevState.fullText.charAt(prevState.index),
          index : prevState.index + 1
        })
      );
      this.setState(prevState => (
        {
          timeOuts : [...prevState.timeOuts, setTimeout(this.typingText, 20)],
        })
      );
    }
    else {
      setTimeout(this.props.doneTyping, 20);
    }
  }

  showFullText (event) {
    if (event.keyCode === 13) {
      for (let i = 0; i < this.state.timeOuts.length; i++) {
        window.clearTimeout(this.state.timeOuts[i]);
      }
      this.setState({ typedText : this.state.fullText });
      setTimeout(this.props.doneTyping, 20);
    }
  }

  render () {
    return (
      <div className="typing-text" ref={this.textRef}>
        { this.state.typedText && this.state.typedText.split('\n').map((text, index) =>
          {
            return <div key={index}>{ text }</div>
          }
        )}
      </div>
    );
  }
}

export default TypingText;