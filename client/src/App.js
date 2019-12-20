import React, { Component } from 'react';
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz';
import { getDotStr } from './utils/restClient'
import Graph from './components/Graph'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      dotStr: '',
    };
  }
  
  async setGraph() {
    const dotStr = await getDotStr();
    console.log('DOT source =', dotStr);
    this.setState({dotStr})
    console.log(this.state.dotStr)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to interactive CDCL</h1>
        </header>
        <script src="https://unpkg.com/viz.js@1.8.0/viz.js" type="javascript/worker"></script>
        <Graph
          dotStr={this.state.dotStr}
        />
        {this.state.dotStr}
        <button className="square" onClick={() => this.setGraph()}>
          {'Click me'}
        </button>
      </div>
    );
  }
}

export default App;
