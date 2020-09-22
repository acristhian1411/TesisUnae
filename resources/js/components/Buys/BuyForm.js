import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, InputLabel, TextField, Button,
   Snackbar, Grid, Tooltip, Table, TableBody, TableCell, TableContainer,
   TableHead, TableRow, Paper} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Autocomplete } from '@material-ui/lab';
import { Alert } from '@material-ui/lab';
import SmallModal from '../Modals/SmallModal';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ProductForm from '../Products/ProductForm';
import ProviderForm from '../Providers/ProviderForm';
import validator from'../validator/validator';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import PropTypes from "prop-types";

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 700,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 8, 6),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

 class BuyForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      snack_open: false,
      message_success: '',
      open: true,
      values: [],
      setOpen: true,
      buy_id:0,
      buy_date:'',
      buy_invoice_number: 0,
      person_id: 0,
      business_name:'',
      buy_details_id:0,
      product_id:0,
      prod_descrip:'',
      bdetails_qty: 0,
      bdetails_price:0,
      bdetails_discount:0,
      modal_product: false,
      modal_provider: false,
      edit: false,
      errors: [],
      products: [],
      providers: [],
      validator: {
        buy_date:{
          message:'',
          error: false,
        },
        buy_invoice_number:{
          message:'',
          error: false,
        },
        person_id:{
          message:'',
          error: false,
        },
        buy_id:{
          message:'',
          error: false,
        },
        product_id:{
          message:'',
          error: false,
        },
        bdetails_qty:{
          message:'',
          error: false,
        },
        bdetails_price:{
          message:'',
          error: false,
        },
        bdetails_discount:{
          message:'',
          error: false,
        }
      }
    }

    this.updateState= () =>{
      this.setState({
        modal_provider: false,
        modal_product: false,
      });
      axios.get('api/providers').then(res=>{
        this.setState({providers: res.data.data});
        });

    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.fieldsChange = this.fieldsChange.bind(this)
    this.fieldChange2 = this.fieldChange2.bind(this)
    this.handleCreateObject = this.handleCreateObject.bind(this)
    this.handleUpdateObject = this.handleUpdateObject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.openModalProvider = this.openModalProvider.bind(this);
    this.openModalProduct = this.openModalProduct.bind(this);
    this.selectValue= this.selectValue.bind(this);
    this.selectsChange= this.selectsChange.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.openSnack = this.openSnack.bind(this);

     handleChange = (event) => {
      this.setState({
        ...values,
        [event.target.name]: event.target.value
      });
    };

  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.buy.data.buy_id
this.setState({
  buy_id: this.props.product.data.buy_id,
  person_id: this.props.product.data.person_id,
  buy_date: this.props.product.data.buy_date,
  person_id: this.props.product.data.person_id,
  business_name: this.props.product.data.business_name,
  brand_id: this.props.product.data.brand_id,
  brand_descrip: this.props.product.data.brand_descrip,
  prod_descrip: this.props.product.data.prod_descrip,
  buy_invoice_number: this.props.product.data.buy_invoice_number,
  prod_sale_price: this.props.product.data.prod_sale_price,
  stock_min: this.props.product.data.stock_min,
})
if (this.props.product.data.buy_invoice_number === 5) {
  this.setState({
    buy_invoice_number2:'5%'
  })
}
if (this.props.product.data.buy_invoice_number === 10) {
  this.setState({
    buy_invoice_number2:'10%'
  })
}
}
  axios.get('api/providers').then(res=>{
    this.setState({providers: res.data.data});
    });
  axios.get('api/products').then(res=>{
    this.setState({products: res.data.data});
    });
  }
  handleOpen () {
    this.setState({
      setOpen: true
    });
  };

  handleClose () {
    this.setState({
      open: false
    });
    this.props.onHandleSubmit();
  };
  closeSnack(){
    this.setState({snack_open: false});
  }
  openSnack(param){
    // console.log(param);
    this.setState({snack_open: true, message_success: param});
  }
  openModalProvider(){
    this.setState({modal_provider:true});
  };
  openModalProduct(){
    this.setState({modal_product:true});
  };
  fieldChange2(e, values){
  // console.log(values);
  this.setState({person_id: values.value, prod_descrip: values.label});
  this.props.changeAtribute(true);
}
fieldsChange(e){
  e.preventDefault();
  // console.log(e.target.name);
  this.setState({[e.target.name]: e.target.value});
}

 selectsChange(e, values, nameValue,nameLabel){

   this.setState({[nameValue]: values.value, [nameLabel]: values.label});
   this.props.changeAtribute(true);
 }

handleCreateObject (e) {
  e.preventDefault();
  var {buy_invoice_number, person_id, brand_id, person_id, prod_sale_price, stock_min, prod_descrip} = this.state;
  var validator = {
    buy_invoice_number: {error: false,  message: ''},
    prod_sale_price: {error: false,  message: ''},
    prod_descrip: {error: false,  message: ''},
    person_id: {error: false,  message: ''},
    person_id: {error: false,  message: ''},
    brand_id: {error: false,  message: ''},
    stock_min: {error: false,  message: ''}
};
  var object_error = {};
  const object = {
    prod_descrip: this.state.prod_descrip.toUpperCase(),
    buy_invoice_number: this.state.buy_invoice_number,
    prod_sale_price: this.state.prod_sale_price,
    person_id: this.state.person_id,
    brand_id: this.state.brand_id,
    person_id: this.state.person_id,
    stock_min: this.state.person_id,
    }
    axios.post('api/products', {buy_invoice_number:object.buy_invoice_number, person_id:object.person_id,
      prod_sale_price:object.prod_sale_price, person_id:object.person_id,
    prod_descrip:object.prod_descrip, brand_id:object.brand_id, stock_min:object.stock_min})
      .then(res => {
        this.props.onSuccess(res.data);
        this.props.changeAtribute(false);
        this.handleClose();
      }
    ).catch(error => {
      // console.log(Object.keys(error.response.data.errors));
      var errores = Object.keys(error.response.data.errors);
      for (var i = 0; i < errores.length; i++) {
        object_error = {
          ...object_error,
          [errores[i]]: {
            error: true,
            message: error.response.data.errors[errores[i]][0]
          }
        }
      }
      this.setState({
        validator:{
          ...validator,
          ...object_error
        }
      });
    });
  }


  handleUpdateObject(e) {
    e.preventDefault();
    var {buy_invoice_number, person_id, brand_id, person_id, prod_sale_price, prod_descrip} = this.state;
    var validator = {
      buy_invoice_number: {error: false,  message: ''},
      prod_sale_price: {error: false,  message: ''},
      prod_descrip: {error: false,  message: ''},
      person_id: {error: false,  message: ''},
      person_id: {error: false,  message: ''},
      brand_id: {error: false,  message: ''}
  };
    var object_error = {};
    const object = {
      prod_descrip: this.state.prod_descrip.toUpperCase(),
      buy_invoice_number: this.state.buy_invoice_number,
      prod_sale_price: this.state.prod_sale_price,
      person_id: this.state.person_id,
      brand_id: this.state.brand_id,
      person_id: this.state.person_id,
      }
    const id = this.props.product.data.buy_id
    axios.put(`api/products/${id}`, {buy_invoice_number:object.buy_invoice_number, person_id:object.person_id,
      prod_sale_price:object.prod_sale_price, person_id:object.person_id,
    prod_descrip:object.prod_descrip, brand_id:object.brand_id})
      .then((res) => {
        this.props.onSuccess(res.data.message);
        this.props.changeAtribute(false);
        this.handleClose();
      }).catch(error => {
        // console.log(Object.keys(error.response.data.errors));
        var errores = Object.keys(error.response.data.errors);
        for (var i = 0; i < errores.length; i++) {
          object_error = {
            ...object_error,
            [errores[i]]: {
              error: true,
              message: error.response.data.errors[errores[i]][0]
            }
          }
        }
        this.setState({
          validator:{
            ...validator,
            ...object_error
          }
        });
      });
  }
  Product() {
         return (this.state.products.map(data => ({ label: data.prod_descrip, value: data.product_id })));
       }
 Provider() {
        return (this.state.providers.map(data => ({ label: data.business_name, value: data.person_id })));
      }

       selectValue(name, label){
         return {label:this.state[name], value:this.state[label]};
       }
  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  botonEdit(){
    if (this.props.edit) {
      return (<Button variant="outlined" color="primary" startIcon={<SaveIcon />} type='submit' onClick={this.handleUpdateObject}>Actualizar</Button>);
    }
    else {
      return (<Button variant="outlined" color="primary" startIcon={<SaveIcon />} type='submit' onClick={this.handleCreateObject}>Guardar</Button>);

    }
  }


render(){
  var showModalProduct;
  var showModalProvider;
  var showSnack;

if (this.state.modal_product) {
  showModalProduct = <SmallModal >
                {{onHandleSubmit: this.updateState,
                  form: <ProductForm />,
                  props_form: {close: true, onSuccess:this.openSnack}
                }}
              </ SmallModal>
}
if (this.state.modal_provider) {
  showModalProvider = <SmallModal >
                {{onHandleSubmit: this.updateState,
                  form: <ProviderForm />,
                  props_form: {close: true, onSuccess:this.openSnack}
                }}
              </ SmallModal>
}
if (this.state.snack_open){
      showSnack = <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snack_open} autoHideDuration={6000} onClose={this.closeSnack}>
                     <Alert elevation={6} variant="filled" onClose={this.closeSnack} severity="success">
                       {this.state.message_success}
                     </Alert>
                   </Snackbar>
    }
  const { classes } = this.props;
  return (
    <div>
          <h3>Formulario de Compras</h3>
          <hr />
          <Tooltip title="Agregar Producto">
              <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} color="primary" onClick={this.openModalProduct}>
                {''}
              </Button>
          </Tooltip>
                          
                          
                
                <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                <Grid item xs={5}>
                <Autocomplete
                    id="combo-box-demo"
                    disableClearable
                    options={this.Provider()}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, values)=>this.selectsChange(e, values, 'person_id', 'business_name')}
                    value={this.selectValue('business_name', 'person_id')}
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
                    renderInput={(params) => <TextField {...params} label="Proveedores *" error={this.state.validator.person_id.error}
                    className="textField" variant="outlined"/>}
                  />
                           </Grid>
                <Grid item xs={2}>

                  <Tooltip title="Agregar Proveedor">
                    <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} color="primary" onClick={this.openModalProvider}>
                      {''}
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={5}>
                <TextField
                      id="outlined-basic"
                      label="Fecha de Compra"
                      type="date"
                      fullWidth
                      style={{ margin: 8 }}
                      value={this.state.buy_date}
                      name="buy_date"
                      onChange={this.fieldsChange.bind(this)}
                      margin="normal"

                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      error={this.state.validator.buy_date.error}
                      helperText={this.state.validator.buy_date.message}
                    />
                
                </Grid>
                               </Grid>
                <Grid container item xs={12} spacing={3}>
                <Grid item xs={5}>
                <TextField
                      id="outlined-basic"
                      label="Numero de factura"
                      type="text"
                      fullWidth
                      style={{ margin: 8 }}
                      value={this.state.buy_invoice_number}
                      name="buy_invoice_number"
                      onChange={this.fieldsChange.bind(this)}
                      margin="normal"

                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      error={this.state.validator.buy_invoice_number.error}
                      helperText={this.state.validator.buy_invoice_number.message}
                    />
                     <Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
                </Grid>
                </Grid>

                              </Grid>
                              <br/>
                        {this.botonEdit()}
                        <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.handleClose} onClick={this.handleClose}>Cancelar</Button>


                
                {showModalProduct}
                {showModalProvider}
                {showSnack}

    </div>
  );
  }
}
export default withRouter( withStyles(styles, { withTheme: true })(BuyForm));
