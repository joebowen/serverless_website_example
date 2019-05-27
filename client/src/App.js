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
      buttonLabel: 'Test AWS Lambda!',
      messages: ["If you see this, the Lambda function didn't work or is still loading."]
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    request
      .get(process.env.REACT_APP_SERVICE_ENDPOINT + '/hello', (error, response, body) => {
        var json_body = JSON.parse(body)
        console.log(json_body.messages)

        this.setState(
            {
                messages: json_body.messages
            }
        )
      })

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
		const messages = this.state.messages.map((item, key) =>
			<li key={key}>{item}</li>
		);

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to the Serverless Framework / AWS Lambda / Python 3.7 / React.js Demo</h2>
        </div>
        <p className='App-intro'>
          <Button color='danger' onClick={this.toggle}>{this.state.buttonLabel}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Lambda Test</ModalHeader>
            <ModalBody>
            	<ul class='list-unstyled'>
								{messages}
							</ul>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.toggle}>Ok</Button>{' '}
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
					</Modal>
        </p>
      </div>
    );
  }
}

export default App;
