import React, { Component} from 'react';
// import React, { Component, lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//
import AppointmentsList from './Appointments/AppointmentsList';
import BrandsList from './Brands/BrandsList';
import BranchList from './Branch/BranchList';
import CategoriesList from './Categories/CategoriesList';
import SubCategoriesList from './SubCategories/SubCategoriesList';
import CitiesList from './Cities/CitiesList';
import DistricsList from './Districts/DistricsList';
import ProductsList from './Products/ProductsList';
import ProductShow from './Products/ProductShow';
import ProvidersList from './Providers/ProvidersList';
import ProviderShow from './Providers/ProviderShow';
import BuysList from './Buys/BuysList';


class Routes extends Component {
  render () {
    return (

        <div>
          <Switch>
          <Route exact path='/compras' component={BuysList} />
          <Route exact path='/productos' component={ProductsList} />
          <Route exact path='/sucursales' component={BranchList} />
          <Route exact path='/productos/show/:id' component={ProductShow} />
          <Route exact path='/cargos' component={AppointmentsList} />
          <Route exact path='/marcas' component={BrandsList} />
          <Route exact path='/categorias' component={CategoriesList} />
          <Route exact path='/subcategorias' component={SubCategoriesList} />
          <Route exact path='/ciudades' component={CitiesList} />
          <Route exact path='/barrios' component={DistricsList} />
          <Route exact path='/proveedores' component={ProvidersList} />
          <Route exact path='/proveedores/show/:id' component={ProviderShow} />

          </Switch>
        </div>
    );
  }
}
  export default Routes;
