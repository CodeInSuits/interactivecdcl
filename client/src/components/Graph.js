import React, { Component } from 'react';
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz';

class Graph extends Component {

  constructor(props){
    super(props);
    this.state = {
      graphviz: null
    }
  }
  
  setGraph() {
    console.log('In Graph component DOT source =', this.props.dotStr);
    this.state.graphviz.renderDot(this.props.dotStr);
  }
  componentDidMount() {
    const graphviz = d3.select(".graph").graphviz()
          .transition(
            () => d3.transition("main")
            .ease(d3.easeLinear)
            .delay(500)
            .duration(1000)
          )
          .logEvents(true)
          .on("initEnd", this.setGraph);
    this.setState({graphviz})
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