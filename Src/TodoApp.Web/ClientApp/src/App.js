import React, { Component } from 'react';
import TodoContainer from './components/TodoContainer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Container fluid="md">
        <Row>
          <Col>
          <TodoContainer></TodoContainer>  
          </Col>
        </Row>         
      </Container>
    );
  }
}
