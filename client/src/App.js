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
      text: 'If you see this, the Lambda function didn\'t work.'
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    request
      .get(process.env.REACT_APP_SERVICE_ENDPOINT + '/hello', (error, response, body) => {
        var json_body = JSON.parse(body)
        console.log(json_body.message)

        this.setState(
            {
                text: json_body.message
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
            <ModalHeader toggle={this.toggle}>Lambda Test</ModalHeader>
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
