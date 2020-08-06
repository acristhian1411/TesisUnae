//import 'core-js/stable';
import regeneratorRuntime from "regenerator-runtime";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Routes from './Routes';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
        <div>
          <Header />

          </div>
          <div>




          </div>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
