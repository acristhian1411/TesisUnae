    import ProductForm from './ProductForm';
    import MidModal from '../Modals/MidModal';
    import React, { Component,lazy} from 'react';
    import DialogDestroy from '../Dialogs/DialogDestroy';
    import {Button, Dialog, DialogActions, DialogTitle, Icon, Table,
      TableBody, TableCell, TableContainer, TableHead, TableRow,
      TablePagination, Paper, TextField, MobileStepper,
      Select, MenuItem, TableSortLabel,TableFooter, InputBase,
      InputLabel, Tooltip, Snackbar} from '@material-ui/core';
    import { Alert } from '@material-ui/lab';
    import { Link } from 'react-router-dom';
    import DeleteIcon from '@material-ui/icons/Delete';
    import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
    import EditIcon from '@material-ui/icons/Edit';
    import VisibilityIcon from '@material-ui/icons/Visibility';
    import { makeStyles,  withStyles } from '@material-ui/core/styles';
    import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
    import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
    import Paginator from '../Paginators/Paginator';
    import { Autocomplete } from '@material-ui/lab';


    const useStyles = makeStyles({
      table: {

        width: 650,
      },
    });
    const BootstrapInput = withStyles(theme => ({
      root: {
        'label + &': {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '1px 26px 3px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    }))(InputBase);



    class ProductsList extends Component {
      constructor () {
        super()
        this.state = {
          snack_open: false,
          message_success: '',
          products: [],
          product_id: 0,
          branch_id: 1,
          branches: [],
          branch_descrip: '',
          product: [],
          edit: false,
          new: false,
          open: false,
          search: '',
          filteredproducts:[],
          prevActiveStep: 1,
          rowsPerPage: 5,
          paginator:[],
          order: 'asc',
          orderBy: 'prod_descrip',
          page_lenght: 0,
          page: 1,
          time_out: false
        };

        this.getObject = async(perPage, page, branch=this.state.branch_id , orderBy=this.state.orderBy, order=this.state.order) =>{
           let res = await axios.get(`/api/products-stock/${branch}?sort_by=${orderBy}&order=${order}&per_page=${perPage}&page=${page}`);
           let data = await res.data;
           this.setState({products: data, paginator:data, filteredproducts: data.data,  open:false, page_lenght: res.data.last_page, page: res.data.current_page});
      }

        this.updateState= () =>{
          this.setState({
            edit: false,
            new: false,
            open: false
          });
          this.getObject(this.state.rowsPerPage, this.state.page);
        }
//funciones
        this.clickAgregar = this.clickAgregar.bind(this)
        this.clickEditar = this.clickEditar.bind(this)
        // this.clickSortByName = this.clickSortByName.bind(this)
        // this.clickSortByCode = this.clickSortByCode.bind(this)
        this.deleteObject = this.deleteObject.bind(this)
        this.closeSnack = this.closeSnack.bind(this);
        this.openSnack = this.openSnack.bind(this);
        this.perPageChange = this.perPageChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.search = this.search.bind(this);
        this.selectsChange = this.selectsChange.bind(this);
        this.selectValue = this.selectValue.bind(this);
// funciones para abrir Dialog
        this.handleClickOpen = (data) =>{
                this.setState({open: true, product: data});
              }

        this.handleClose = () =>{
                this.setState({open: false});
        }
//fin constructor
      }



      componentDidMount () {
        this.getObject(this.state.rowsPerPage, this.state.page);
        axios.get(`/api/branches/`).then(res=>{
          this.setState({
            branches: res.data.data,
          });
          })
      }

      selectsChange(e, values, nameValue,nameLabel){
        this.setState({[nameValue]: values.value, [nameLabel]: values.label});
        this.getObject(this.state.rowsPerPage, this.state.page, values.value);
      }

      Branch() {
             return (this.state.branches.map(data => ({ label: data.branch_descrip, value: data.branch_id })));
           }
     selectValue(name, label){
       return {label:this.state[name], value:this.state[label]};
     }
      closeSnack(){
        this.setState({snack_open: false});
      }
      openSnack(param){
        this.setState({snack_open: true, message_success: param});
      }
      perPageChange(value){
        this.setState({rowsPerPage: value, prevActiveStep: 1, page: 1});
        this.getObject(value, 1);
      }
      pageChange(value){
        this.setState({prevActiveStep: value, page: value});
        this.getObject(this.state.rowsPerPage, value);
      }
      searchChange(e){
          this.setState({search:e.value});
        }
    search (event) {
      var e = event;
      //funciona pero falta validar error 500
      e.persist();
      if (this.state.time_out==false) {
        this.setState({time_out:true});
        setTimeout(()=>{
          if(e.target.value===''){
            this.setState({
              filteredproducts:this.state.products.data,
              paginator:this.state.products,
              page_lenght: this.state.products.last_page,
              page: 1,
              time_out:false
            });
          }
          else {
            axios.get(`/api/products/search/${e.target.value}?branch=${this.state.branch_id}`).then(res=>{
              this.setState({
                filteredproducts: res.data.data,
                paginator: res.data,
                page_lenght: res.data.last_page,
                page: res.data.current_page,
                time_out:false
              });
              }).catch(error=>{
                console.log("Ingrese un valor valido");
              });
          }
          }
        , 3000);

      }

      }



        deleteObject() {
            axios.delete(`api/products/${this.state.product_id}`).then((res) => {
              this.setState({snack_open: true, message_success: res.data.message});
              this.updateState();

                })
        }


      clickEditar(data){
        this.setState({
          edit: true,
          product: data
        })
      }

      clickAgregar(){
        this.setState({new:true});
      }
      createSortHandler(name){
        var order = '';
        if(this.state.orderBy===name){
          if(this.state.order==='asc'){
            order = 'desc';
            this.setState({order});
          }
          else{
            order = 'asc';
            this.setState({order});
          }
        }
        else{
          order = 'asc';
          this.setState({orderBy: name, order});
        }
          this.getObject(this.state.rowsPerPage, this.state.page, name, order);
      }

      render () {
        var paginator;
        var showModal;
        var showDialogDestroy;
        var showSnack;
        const {snack_open, message_success, filteredproducts, open, product, orderBy, order} = this.state;
       if (this.state.new) {
        // showModal = <ProductForm edit={false} onHandleSubmit={this.updateState}/>
        showModal = <MidModal >
                      {{onHandleSubmit: this.updateState,
                        form: <ProductForm />,
                        props_form: {onSuccess:this.openSnack}
                      }}
                    </ MidModal>
      }
       else if (this.state.edit) {
         // showModal = <ProductForm edit={true} onHandleSubmit={this.updateState} product={this.state.product}/>
         showModal = <MidModal >
                       {{onHandleSubmit: this.updateState,
                         form: <ProductForm />,
                         props_form: {edit: true, product:this.state.product, onSuccess:this.openSnack}
                       }}
                     </ MidModal>
       }
       if(open) {
         showDialogDestroy = <DialogDestroy index={product.data.prod_descrip} onClose={this.handleClose} onHandleAgree={this.deleteObject}/>;
       }
       if (snack_open){
             showSnack = <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={snack_open} autoHideDuration={6000} onClose={this.closeSnack}>
                            <Alert elevation={6} variant="filled" onClose={this.closeSnack} severity="success">
                              {message_success}
                            </Alert>
                          </Snackbar>
           }
           if(filteredproducts.length === 0){
                     paginator =  <div>{''}</div>
                   }else{
                     paginator = <Paginator
                     lenght={this.state.page_lenght}
                     perPageChange= {this.perPageChange}
                     pageChange ={this.pageChange}
                     page= {this.state.page}
                     />
                   }
        return (
         <div className='card-body'>

                             <h2 align='center'>Productos<TextField id="outlined-search" label="Buscar" type="search" variant="outlined" onChange={this.search} /></h2>
                             <hr />
                             <h2 align='center'>Sucursal
                             <Autocomplete
                                        id="combo-box-demo"
                                        disableClearable
                                        options={this.Branch()}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(e, values)=>this.selectsChange(e, values, 'branch_id', 'branch_descrip')}
                                        value={this.selectValue('branch_descrip', 'branch_id')}
                                        getOptionSelected={(option, value)=>{
                                          if (value===option.value) {
                                            return(option.label);
                                          }
                                          else {
                                            return false;
                                          }
                                        }}
                                        style={{ margin: 8 }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Sucursal *"
                                         className="textField" variant="outlined"/>}
                                      />
                                      </h2>
                             <TableContainer component={Paper}>
                           <Table aria-label="simple table" option={{search: true}}>
                             <TableHead>
                               <TableRow>
                                 <TableCell sortDirection={orderBy === 'prod_descrip' ? order : false}>
                                   <TableSortLabel
                                     active={orderBy === 'prod_descrip'}
                                     direction={orderBy === 'prod_descrip' ? order : 'asc'}
                                     onClick={()=>{this.createSortHandler('prod_descrip')}}
                                   >
                                     <h3>Descripcion</h3>
                                   </TableSortLabel>
                                 </TableCell>

                                 <TableCell sortDirection={orderBy === 'brand_descrip' ? order : false}>
                                   <TableSortLabel
                                     active={orderBy === 'brand_descrip'}
                                     direction={orderBy === 'brand_descrip' ? order : 'asc'}
                                     onClick={()=>{this.createSortHandler('brand_descrip')}}
                                   >
                                     <h3>Marca</h3>
                                   </TableSortLabel>
                                 </TableCell>

                                 <TableCell sortDirection={orderBy === 'business_name' ? order : false}>
                                   <TableSortLabel
                                     active={orderBy === 'business_name'}
                                     direction={orderBy === 'business_name' ? order : 'asc'}
                                     onClick={()=>{this.createSortHandler('business_name')}}
                                   >
                                     <h3>Proveedor</h3>
                                   </TableSortLabel>
                                 </TableCell>

                                 <TableCell sortDirection={orderBy === 'stock_qty' ? order : false}>
                                   <TableSortLabel
                                     active={orderBy === 'stock_qty'}
                                     direction={orderBy === 'stock_qty' ? order : 'asc'}
                                     onClick={()=>{this.createSortHandler('stock_qty')}}
                                   >
                                     <h3>Cantidad</h3>
                                   </TableSortLabel>
                                 </TableCell>

                                 <TableCell colSpan="2">
                                  <Tooltip title="Agregar">
                                   <Button variant="outlined" color="primary" startIcon={< AddBoxOutlinedIcon />} type='submit' onClick={this.clickAgregar} >{' '}</Button>
                                   </Tooltip>
                                 </TableCell>
                               </TableRow>
                             </TableHead>
                             {this.renderList()}
                           </Table>
                         </TableContainer>

                           {paginator}
                           {showModal}
                           {showDialogDestroy}
                           {showSnack}
                           <br/>

                  </div>
        )
      }

      // selectValue(event){
      //       this.setState({search: event.target.value})
      //     };
        renderList(){
          if(this.state.filteredproducts.length === 0){
      return(
        <TableBody>
        <TableRow>
          <TableCell>{' '}</TableCell>
          <TableCell>{'No contiene datos'}</TableCell>
          <TableCell>{' '}</TableCell>
          <TableCell>{''}</TableCell>
          </TableRow>
          </TableBody>
      )
    }else{
          return this.state.filteredproducts.map((data)=>{
            return(
          <TableBody key={data.product_id}>
              <TableRow>
              <TableCell>{data.prod_descrip}</TableCell>
              <TableCell>{data.brand_descrip}</TableCell>
              <TableCell>{data.business_name}</TableCell>
                <TableCell>{data.stock_qty}</TableCell>
                <TableCell>
                <Tooltip title='Mostrar'>

                            <Link className='navbar-brand'to={"/productos/show/"+ data.product_id}>
                              <Button variant="outlined" color="primary" startIcon={< VisibilityIcon />} >{' '}</Button>
                            </Link>
                            </Tooltip>

                          </TableCell>
                <TableCell>
                <Tooltip title='Editar'>
                  <Button variant="outlined" color="primary" startIcon={< EditIcon />} type='submit' onClick={()=>{this.clickEditar({data: data})}} >{' '}</Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                <Tooltip title='Eliminar'>
                  <Button variant="outlined" color="secondary" onClick={()=>{this.handleClickOpen({data: data}), this.setState({product_id:data.product_id})}}>
                    <DeleteIcon />
                  </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>

          </TableBody>
        )})}
}
    }


    export default ProductsList
