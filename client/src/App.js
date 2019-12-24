import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz';
import { getDotStr } from './utils/restClient';
import Graph from './components/Graph';
import { ClauseForm } from './components/Form';
import { Grid, Row, Col, Button } from 'react-bootstrap';


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
      <Grid className="App">
        <Row>
          <Col sm={3}>
            <ClauseForm />
          </Col>
          <Col sm={9}>
            <Graph
              dotStr={this.state.dotStr}
            />
            { this.state.dotStr && <div className="graph-steps-container">
              <div>
                <Button bsStyle="primary">
                  Prev cont
                </Button>
                <Button bsStyle="primary">
                  Prev step
                </Button>
              </div>
              <div>
                <Button bsStyle="primary">
                  Step
                </Button>
                <Button bsStyle="primary">
                  Cont
                </Button>
              </div>
            </div> }
          </Col>
        </Row>
        <Button className="square" onClick={() => this.setGraph()}>
          {'Click me'}
        </Button>
      </Grid>
    );
  }
}

export default App;
