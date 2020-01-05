import React, { Component } from 'react';
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz';

class Graph extends Component {

  constructor(props){
    super(props);
  }
  
  setGraph() {
    console.log('In Graph component DOT source =', this.props.dotStr);
    d3.select(".graph").graphviz().renderDot(this.props.dotStr);
  }
  componentDidMount() {
    this.setGraph();
  }
  componentDidUpdate() {
    this.setGraph();
  }

  render() {
    return (
        <div className="graph">
            <script src="https://unpkg.com/viz.js@1.8.0/viz.js" type="javascript/worker"></script>
        </div>
    );
  }
}

export default Graph;