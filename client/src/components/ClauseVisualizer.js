import React, { Component } from 'react';
import { getDotStr } from '../utils/restClient';
import Graph from './Graph';
import { Button, Grid, Row, Col } from 'react-bootstrap';


class ClauseVisualizer extends Component {

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
                <Button bsStyle="primary" onClick={this.props.onEditClauseClick}>
                Edit clause
                </Button>
            </Col>
            <Col sm={9}>
                <Graph
                dotStr={this.state.dotStr}
                />
                { this.state.dotStr && <div className="graph-steps-container">
                <div>
                    <Button bsStyle="primary">
                    Prev step
                    </Button>
                </div>
                <div>
                    <Button bsStyle="primary">
                    Step
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

export default ClauseVisualizer;