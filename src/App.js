import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.png';
import {Container, Accordion, Card, Form, Navbar} from 'react-bootstrap';
import CustomToggle from './components/CustomToggle.js';
import profileData from './data/profile.json'
// import { ExportReactCSV } from './components/ExportCsv'

function getFormControls(questions) {
  return questions.map(q => {
    return(
      <>
        <Form.Label>{q}</Form.Label>
        <Form.Control as="textarea" rows="3" />
      </>
    );
  });
}

class App extends Component {
  constructor(props) {
      super(props);
      // profileData.categories.map((cat, index) => {
      //     cat.questions.map(q => {

      //     });
      // });
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }
  
  render() {
    const container = {height: 1300};
    let cards = profileData.categories.map((cat, index) => {
      return(<Card>
        <Card.Header>
          <CustomToggle eventKey={index}><h3>{cat.category}</h3></CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={index}>
          <Card.Body>
            <Form.Group controlId={"ControlTextArea" + index}>
              {getFormControls(cat.questions)}
            </Form.Group>
          </Card.Body>
        </Accordion.Collapse>
      </Card>);
    });
    return(
      <div>
        <Router>
          <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {' Profile Easy'}
            </Navbar.Brand>
          </Navbar>
          </header>
        </Router>
        <Container style={container} className="text-center mt-5 pt-5">
          {/* <div className="col-md-4 center">
            <ExportReactCSV csvData={this.state.customers} fileName={this.state.fileName} />
          </div> */}
          <Form>
            <Accordion defaultActiveKey="0">
              {cards}
            </Accordion>
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;