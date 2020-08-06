import React, {Component} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {FormControl, FormHelperText, Select, MenuItem, Grid} from '@material-ui/core';

/*
  Se llama utilizando props en linea, en el cual se le deben pasar los siguientes,
  lenght: se regiere a la cantidad de paginas o la ultima pagina (last_page),
  perPageChange: manejador del select para hacer una peticion segun sea
    la cantidad por pagina
  pageChange: manejador de cambio de pagina
  page: recibe en que pagina se encuentra el estado de la tabla, ya que aveces
    vuelve a 1, segun sea la peticion.
    ejemplo:
      <Paginator
        lenght={this.state.page_lenght}
        perPageChange= {this.perPageChange}
        pageChange ={this.pageChange}
        page= {this.state.page}
        />
*/

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state ={
      lenght: 0,
      perPage: 5,
      page: 1
    }
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }
  handleChangeSelect(e){
    this.setState({perPage:e.target.value});
    this.props.perPageChange(e.target.value);
  }
  handleChangePage(e, value){
    this.props.pageChange(value);
  }
  componentDidUpdate(prevProps, prevState) {

    if (this.props.page !== prevProps.page && this.props.page !== this.state.page) {
      this.setState({page: this.props.page});
    }
  }

  render(){
    const {lenght} = this.props;
    const {perPage, page} = this.state;
    // console.log(this.props);

    return (
    <div className="pagination">
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={5} style={{textAlign:'right'}}>
          <FormControl>
            <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="select"
            value={perPage}
            onChange={this.handleChangeSelect}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="15">15</MenuItem>
            </Select>
            <FormHelperText>Filas por pagina</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <Pagination style={{marginTop: 15}} count={lenght} color="primary" page={page} onChange={this.handleChangePage} />
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
  }
}
