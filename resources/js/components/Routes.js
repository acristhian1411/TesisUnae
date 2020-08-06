import React, { Component} from 'react';
// import React, { Component, lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//
import AppointmentsList from './Appointments/AppointmentsList';


class Routes extends Component {
  render () {
    return (

        <div>
          <Switch>
          <Route exact path='/cargos' component={AppointmentsList} />

          </Switch>
        </div>
    );
  }
}
  export default Routes;
