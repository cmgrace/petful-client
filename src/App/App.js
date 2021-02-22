import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Pet from "../Pet/Pet";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path={"/"} component={HomePage} />
            <Route path={"/pet"} component={Pet} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
