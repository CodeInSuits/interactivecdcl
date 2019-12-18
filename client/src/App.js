import React, { Component } from 'react';
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz';
// import { getDotStr } from './utils/restClient'
import axios from 'axios'

// var dotStr = 'digraph  {a -> b}';

class App extends Component {

  constructor(){
    super();
    this.state = {};
  }
  setGraph() {
    // const dotStr = getDotStr();
    // console.log('DOT source =', dotStr);
    axios.get('/dotstr')
    .then(function (response) {
        console.log('SUCCESS', response);
        d3.select(".graph").graphviz().renderDot(response.data.data);
    })
    .catch(function (error) {
        console.log('ERROR', error);
    });
    // d3.select(".graph").graphviz().renderDot(dotStr);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to interactive CDCL</h1>
        </header>
        <script src="https://unpkg.com/viz.js@1.8.0/viz.js" type="javascript/worker"></script>

        <div className="graph">
        </div>
        <button className="square" onClick={() => this.setGraph()}>
          {'Click me'}
        </button>
      </div>
    );
  }
}

export default App;
