import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventsList from "./EventsList";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={EventsList} />
        <Route path="/add" component={AddEvent} />
        <Route path="/edit/:id" component={EditEvent} />
      </Router>
    );
  }
}

export default App;
