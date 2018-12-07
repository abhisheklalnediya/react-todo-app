import React, { Component } from 'react'
import { Router, Route, Switch } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import Home from './Home';
import About from './About';

const customHistory = createBrowserHistory();

export default class routes extends Component {
  render() {
    return (
      <Router history={customHistory}>
          <Switch>
          <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
      </Router>
    )
  }
}
