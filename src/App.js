// app.js
import React, { Component } from 'react';
import './App.css';
import MainForm from './components/MainForm';
import { Container } from 'semantic-ui-react';

class App extends Component {

  render() {
    return(
      <Container textAlign='left'>
        <MainForm />
      </Container>     )
  }
}

export default App;