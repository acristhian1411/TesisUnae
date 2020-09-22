    import BuyForm from './BuyForm';
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



    class BuysList extends Component {
      constructor () {
        super()
        this.state = {
          snack_open: false,
          message_success: '',
          buys: [],
          buy_id: 0,
          buy: [],
          edit: false,
          new: false,
          open: false,
          search: '',
          filteredbuys:[],
          prevActiveStep: 1,
          rowsPerPage: 5,
          paginator:[],
          order: 'asc',
          orderBy: 'buy_date',
          page_lenght: 0,
          page: 1,
          time_out: false
        };

        this.getObject = async(perPage, page, orderBy=this.state.orderBy, order=this.state.order) =>{
           let res = await axios.get(`/api/buys?sort_by=${orderBy}&order=${order}&per_page=${perPage}&page=${page}`);
           let data = await res.data;
           this.setState({buys: data, paginator:data, filteredbuys: data.data,  open:false, page_lenght: res.data.last_page, page: res.data.current_page});
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
// funciones para abrir Dialog
        this.handleClickOpen = (data) =>{
                this.setState({open: true, buy: data});
              }

        this.handleClose = () =>{
                this.setState({open: false});
        }
//fin constructor
      }



      componentDidMount () {
        this.getObject(this.state.rowsPerPage, this.state.page);
      }

      closeSnack(){
        this.setState({snack_open: false});
      }
      openSnack(param){
        // console.log(param);
        this.setState({snack_open: true, message_success: param});
      }
      perPageChange(value){
        // console.log(value);
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
              filteredbuys:this.state.buys.data,
              paginator:this.state.buys,
              page_lenght: this.state.buys.last_page,
              page: 1,
              time_out:false
            });
          }
          else {
            axios.get(`/api/buys/search/${e.target.value}`).then(res=>{
              this.setState({
                filteredbuys: res.data.data,
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
            axios.delete(`api/buys/${this.state.buy_id}`).then((res) => {
              this.setState({snack_open: true, message_success: res.data.message});
              this.updateState();

                })
        }


      clickEditar(data){
        this.setState({
          edit: true,
          buy: data
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
        const {snack_open, message_success, filteredbuys, open, buy, orderBy, order} = this.state;
       if (this.state.new) {
        // showModal = <BuyForm edit={false} onHandleSubmit={this.updateState}/>
        showModal = <MidModal >
                      {{onHandleSubmit: this.updateState,
                        form: <BuyForm />,
                        props_form: {onSuccess:this.openSnack}
                      }}
                    </ MidModal>
      }
       else if (this.state.edit) {
         // showModal = <BuyForm edit={true} onHandleSubmit={this.updateState} buy={this.state.buy}/>
         showModal = <MidModal >
                       {{onHandleSubmit: this.updateState,
                         form: <BuyForm />,
                         props_form: {edit: true, buy:this.state.buy, onSuccess:this.openSnack}
                       }}
                     </ MidModal>
       }
       if(open) {
         showDialogDestroy = <DialogDestroy index={buy.data.buy_date} onClose={this.handleClose} onHandleAgree={this.deleteObject}/>;
       }
       if (snack_open){
             showSnack = <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={snack_open} autoHideDuration={6000} onClose={this.closeSnack}>
                            <Alert elevation={6} variant="filled" onClose={this.closeSnack} severity="success">
                              {message_success}
                            </Alert>
                          </Snackbar>
           }
           if(filteredbuys.length === 0){
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

                             <h2 align='center'>Compras<TextField id="outlined-search" label="Buscar" type="search" variant="outlined" onChange={this.search} /></h2>
                             <hr />
                             <TableContainer component={Paper}>
                           <Table aria-label="simple table" option={{search: true}}>
                             <TableHead>
                               <TableRow>

                                 <TableCell sortDirection={orderBy === 'buy_date' ? order : false}>
                                   <TableSortLabel
                                     active={orderBy === 'buy_date'}
                                     direction={orderBy === 'buy_date' ? order : 'asc'}
                                     onClick={()=>{this.createSortHandler('buy_date')}}
                                   >
                                     <h3>Fecha de compra</h3>
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

                                 <TableCell sortDirection={orderBy === 'buy_invoice_number' ? order : false}>
                                   <TableSortLabel
                                     active={orderBy === 'buy_invoice_number'}
                                     direction={orderBy === 'buy_invoice_number' ? order : 'asc'}
                                     onClick={()=>{this.createSortHandler('buy_invoice_number')}}
                                   >
                                     <h3>Numero de factura</h3>
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

      selectValue(event){
            this.setState({search: event.target.value})
          };
        renderList(){
          if(this.state.filteredbuys.length === 0){
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
          return this.state.filteredbuys.map((data)=>{
            return(
          <TableBody key={data.buy_id}>
              <TableRow>
              <TableCell>{data.buy_date}</TableCell>
              <TableCell>{data.business_name}</TableCell>
              <TableCell>{data.buy_invoice_number}</TableCell>

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
                  <Button variant="outlined" color="secondary" onClick={()=>{this.handleClickOpen({data: data}), this.setState({buy_id:data.buy_id})}}>
                    <DeleteIcon />
                  </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>

          </TableBody>
        )})}
}
    }


    export default BuysList
