import React, { Component} from 'react';
// import React, { Component, lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//
import AppointmentsList from './Appointments/AppointmentsList';
import BrandsList from './Brands/BrandsList';
import CategoriesList from './Categories/CategoriesList';
import SubCategoriesList from './SubCategories/SubCategoriesList';


class Routes extends Component {
  render () {
    return (

        <div>
          <Switch>
          <Route exact path='/cargos' component={AppointmentsList} />
          <Route exact path='/marcas' component={BrandsList} />
          <Route exact path='/categorias' component={CategoriesList} />
          <Route exact path='/subcategorias' component={SubCategoriesList} />

          </Switch>
        </div>
    );
  }
}
  export default Routes;
