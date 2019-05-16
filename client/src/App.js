import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const request = require('request');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      buttonLabel: 'Click this button!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    request
      .get('https://www.google.com/images/errors/robot.png', { headers: { 'Access-Control-Allow-Origin' : '*' }})
      .on('response', function(response) {
        console.log(response.statusCode)
        console.log(response.headers['content-type'])
        console.log(response.body)

        this.setState(
            {
                text: response.body
            }
        )
      })

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Button color="danger" onClick={this.toggle}>{this.state.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                {this.state.text}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </p>
      </div>
    );
  }
}

export default App;
