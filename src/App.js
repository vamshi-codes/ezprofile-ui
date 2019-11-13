import React, { Component } from 'react';
import logo from './logo.png';
import {Container, Tab, Tabs, Card, Form, Navbar, Button} from 'react-bootstrap';
import profileData from './data/profile.json'
import {CSVLink} from 'react-csv';


class App extends Component {
  constructor(props) {
      super(props);
      // map1: [[qid, answer]] qa_map
      // map2: [[qid, question]] q_map
      // map3: [[catid, [...qid]]] cat_q_map
      // map4: [[catid, category]] catid_cat_map
      // map5: [[qid, catid]] q_cat_map
      // cat, question, answer
      let qa_map = new Map();
      let q_map = new Map();
      let cat_q_map = new Map();
      let catid_cat_map = new Map();
      let q_cat_map = new Map();
      let qcount = 0;
      profileData.categories.forEach((cat, index) => {
        catid_cat_map.set(cat.categoryId, cat.category);
        let tmp_qids = [];
        cat.questions.forEach(q => {
          let tmp_qid = qcount + 1;
          qa_map.set(tmp_qid, "");
          q_map.set(tmp_qid, q);
          q_cat_map.set(tmp_qid, cat.categoryId);
          tmp_qids.push(tmp_qid);
          // increment for overall question count
          qcount += 1;
        });
        cat_q_map.set(cat.categoryId, tmp_qids);        
      });
      // console.log(qa_map);
      // console.log(q_map);
      // console.log(cat_q_map);
      // console.log(catid_cat_map);
      // console.log(q_cat_map);
      this.state = {
          collapse: false,
          qa_map: qa_map,
          q_map: q_map,
          catid_cat_map: catid_cat_map,
          cat_q_map: cat_q_map,
          q_cat_map: q_cat_map,
          csv: []
      };
      this.saveAnswer = this.saveAnswer.bind(this);
      this.generateCsv = this.generateCsv.bind(this);
   }

  getFormControls(questions, qids) {
    return questions.map((q, index) => {
      return(
        <Form.Group key={"ControlTextArea" + qids[index]} controlId={"ControlTextArea" + qids[index]}>
            <Form.Label>{q}</Form.Label>
            <Form.Control data-qid={qids[index]} onChange={this.saveAnswer} as="textarea" rows="5" />
        </Form.Group>
      );
    });
  }

  saveAnswer(e) {
    // save answer in qa_map 
    let tmp_qa_map = this.state.qa_map;
    
    // console.log(e.target.dataset.qid + '   ' + e.target.value);
    tmp_qa_map.set(parseInt(e.target.dataset.qid), e.target.value)
    this.setState({qa_map: tmp_qa_map});
  }

  generateCsv(e) {
    // use state map to generate csv
    // what if you run out of memory? flush every 10th time
    // naive code, lot of improvement can be made
    let tmp_qa_map = this.state.qa_map; 
    let headers = ["category", "question", "answer"];
    let lines = [];
    lines.push(headers);
    // iterate over the map
    Array.from(tmp_qa_map).map(([key, value]) => {
      let question = this.state.q_map.get(key);
      let _cid = this.state.q_cat_map.get(key);
      let category = this.state.catid_cat_map.get(_cid);
      let line = [];
      line.push(category);
      line.push(question);
      line.push(value);
      lines.push(line);
    });
    this.setState({csv: lines}, () => {
        this.csvLink.link.click();
    });
  }

  render() {
    // const container = {height: 1300};
    const hidden = {'display': 'none'};
    let sonnets = profileData.categories.map((cat, index) => {
      return(<Tab eventKey={cat.categoryKey} title={cat.category}>
        <Card.Body>
          <Form.Group key={"textarea" + index} controlId={"ControlTextArea" + index}>
            {this.getFormControls(cat.questions, this.state.cat_q_map.get(cat.categoryId))}
          </Form.Group>
        </Card.Body>
      </Tab>);
    });
    return(
      <div>
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
        <Container fluid='true'>
          <Form>
            <Tabs defaultActiveKey="company-overview" id="uncontrolled-tab-1">
              {sonnets}
            </Tabs>
            <Button 
            variant="dark"
            size="lg"
            block 
            onClick={this.generateCsv}>Download Me</Button>

            <CSVLink 
            data={this.state.csv} 
            filename="profile.csv" 
            style={hidden}
            ref={(r) => this.csvLink = r}
            target="_blank">Download me</CSVLink>
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;