import React, { Component } from 'react';
import TodoContainer from './components/TodoContainer';
import Container from 'react-bootstrap/Container';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Container>
        <TodoContainer></TodoContainer>   
      </Container>
     

    );
  }
}
