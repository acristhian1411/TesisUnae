import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, InputLabel, TextField, Button, Snackbar, Grid, Tooltip} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Autocomplete } from '@material-ui/lab';
import { Alert } from '@material-ui/lab';
import SmallModal from '../Modals/SmallModal';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import SubsubcategoryForm from '../SubCategories/SubsubcategoryForm';
import validator from'../validator/validator';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

 class ProductForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      snack_open: false,
      message_success: '',
      open: true,
      setOpen: true,
      product_id:0,
      sub_cat_id: 0,
      sub_cat_descrip:'',
      cat_id: 0,
      cat_descript:'',
      brand_id: 0,
      brand_descrip:'',
      person_id: 0,
      business_name:'',
      prod_descrip:'',
      prod_iva: 0,
      prod_iva2: '',
      prod_sale_price:null,
      modal_sub_category: false,
      edit: false,
      errors: [],
      categories: [],
      subcategories: [],
      providers: [],
      brands: [],
      validator: {
        prod_iva:{
          message:'',
          error: false,
        },
        sub_cat_id:{
          message:'',
          error: false,
        },
        cat_id:{
          message:'',
          error: false,
        },
        brand_id:{
          message:'',
          error: false,
        },
        person_id:{
          message:'',
          error: false,
        },
        prod_descrip:{
          message:'',
          error: false,
        },
        prod_sale_price:{
          message:'',
          error: false,
        }
      }
    }

    this.updateState= () =>{
      this.setState({
        modal_sub_category: false,
      });
      axios.get('api/subcategories').then(res=>{
        this.setState({subcategories: res.data.data});
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
    this.openModalSubCategory = this.openModalSubCategory.bind(this);
    this.selectValue= this.selectValue.bind(this);
    this.selectsChange= this.selectsChange.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.openSnack = this.openSnack.bind(this);

  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.product.data.product_id
this.setState({
  product_id: this.props.product.data.product_id,
  sub_cat_id: this.props.product.data.sub_cat_id,
  sub_cat_descrip: this.props.product.data.sub_cat_descrip,
  person_id: this.props.product.data.person_id,
  business_name: this.props.product.data.business_name,
  brand_id: this.props.product.data.brand_id,
  brand_descrip: this.props.product.data.brand_descrip,
  prod_descrip: this.props.product.data.prod_descrip,
  prod_iva: this.props.product.data.prod_iva,
  prod_sale_price: this.props.product.data.prod_sale_price,
})
if (this.props.product.data.prod_iva === 5) {
  this.setState({
    prod_iva2:'5%'
  })
}
if (this.props.product.data.prod_iva === 10) {
  this.setState({
    prod_iva2:'10%'
  })
}
}
  axios.get('api/categories').then(res=>{
    this.setState({categories: res.data.data});
    });
  axios.get('api/subcategories').then(res=>{
    this.setState({subcategories: res.data.data});
    });
  axios.get('api/providers').then(res=>{
    this.setState({providers: res.data.data});
    });
  axios.get('api/brands').then(res=>{
    this.setState({brands: res.data.data});
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
  openModalSubCategory(){
    this.setState({modal_sub_category:true});
  };
  fieldChange2(e, values){
  // console.log(values);
  this.setState({sub_cat_id: values.value, prod_descrip: values.label});
  this.props.changeAtribute(true);
}
fieldsChange(e){
  e.preventDefault();
  // console.log(e.target.name);
  this.setState({[e.target.name]: e.target.value});
}

 selectsChange(e, values, nameValue,nameLabel, route, obj){
   // console.log(name);
   // console.log(nameValue+' '+nameLabel);
   // console.log(e);
   // console.log(values);
   axios.get('api/'+route+'/select/'+values.value).then(res=>{
     this.setState({[obj]: res.data.data});
     });
   this.setState({[nameValue]: values.value, [nameLabel]: values.label});
   this.props.changeAtribute(true);
 }

handleCreateObject (e) {
  e.preventDefault();
  var {prod_iva, sub_cat_id, brand_id, person_id, prod_sale_price, prod_descrip} = this.state;
  var validator = {
    prod_iva: {error: false,  message: ''},
    prod_sale_price: {error: false,  message: ''},
    prod_descrip: {error: false,  message: ''},
    person_id: {error: false,  message: ''},
    sub_cat_id: {error: false,  message: ''},
    brand_id: {error: false,  message: ''}
};
  var object_error = {};
  const object = {
    prod_descrip: this.state.prod_descrip.toUpperCase(),
    prod_iva: this.state.prod_iva,
    prod_sale_price: this.state.prod_sale_price,
    person_id: this.state.person_id,
    brand_id: this.state.brand_id,
    sub_cat_id: this.state.sub_cat_id,
    }
    axios.post('api/products', {prod_iva:object.prod_iva, sub_cat_id:object.sub_cat_id,
      prod_sale_price:object.prod_sale_price, person_id:object.person_id,
    prod_descrip:object.prod_descrip, brand_id:object.brand_id})
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
    var {prod_iva, sub_cat_id, brand_id, person_id, prod_sale_price, prod_descrip} = this.state;
    var validator = {
      prod_iva: {error: false,  message: ''},
      prod_sale_price: {error: false,  message: ''},
      prod_descrip: {error: false,  message: ''},
      person_id: {error: false,  message: ''},
      sub_cat_id: {error: false,  message: ''},
      brand_id: {error: false,  message: ''}
  };
    var object_error = {};
    const object = {
      prod_descrip: this.state.prod_descrip.toUpperCase(),
      prod_iva: this.state.prod_iva,
      prod_sale_price: this.state.prod_sale_price,
      person_id: this.state.person_id,
      brand_id: this.state.brand_id,
      sub_cat_id: this.state.sub_cat_id,
      }
    const id = this.props.product.data.product_id
    axios.put(`api/products/${id}`, {prod_iva:object.prod_iva, sub_cat_id:object.sub_cat_id,
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
  Category() {
         return (this.state.categories.map(data => ({ label: data.cat_descript, value: data.cat_id })));
       }
 Provider() {
        return (this.state.providers.map(data => ({ label: data.business_name, value: data.person_id })));
      }
  SubCategory() {
         return (this.state.subcategories.map(data => ({ label: data.sub_cat_descrip, value: data.sub_cat_id })));
       }
 Brand() {
        return (this.state.brands.map(data => ({ label: data.brand_descrip, value: data.brand_id })));
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
  var showModalCategory;
  var showSnack;

if (this.state.modal_sub_category) {
  showModalCategory = <SmallModal >
                {{onHandleSubmit: this.updateState,
                  form: <SubsubcategoryForm />,
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
          <h3>Formulario de Productos</h3>
          <hr />

                <form  >
                <Grid container spacing={1}>
                <Grid container item xs={20} spacing={3}>
                <Grid item xs={5}>
                <Autocomplete
                           id="combo-box-demo"
                           disableClearable
                           options={this.Category()}
                           getOptionLabel={(option) => option.label}
                           onChange={(e, values)=>this.selectsChange(e, values, 'cat_id', 'cat_descript', 'subcategories', 'subcategories')}
                           value={this.selectValue('cat_descript', 'cat_id')}
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
                           renderInput={(params) => <TextField {...params} label="Categorias *" error={this.state.validator.cat_id.error}
                            className="textField" variant="outlined"/>}
                         />
                         </Grid>
                         <Grid item xs={5}>
                         <Autocomplete
                                    id="combo-box-demo"
                                    disableClearable
                                    options={this.SubCategory()}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(e, values)=>this.selectsChange(e, values, 'sub_cat_id', 'sub_cat_descrip')}
                                    value={this.selectValue('sub_cat_descrip', 'sub_cat_id')}
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
                                    renderInput={(params) => <TextField {...params} label="SubCategorias *" error={this.state.validator.sub_cat_id.error}
                                     className="textField" variant="outlined"/>}
                                  />
                                  </Grid>

                          <Grid item xs={2}>
                          <Tooltip title="Agregar SubCategoria">
                          <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} color="primary" onClick={this.openModalSubCategory}>
                            {''}
                          </Button>
                          </Tooltip>
                          </Grid>
                          </Grid>

                          <Grid container item xs={20} spacing={2}>
                          <Grid item xs={6}>
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
                                   <Grid item xs={6}>
                                   <Autocomplete
                                              id="combo-box-demo"
                                              disableClearable
                                              options={this.Brand()}
                                              getOptionLabel={(option) => option.label}
                                              onChange={(e, values)=>this.selectsChange(e, values, 'brand_id', 'brand_descrip')}
                                              value={this.selectValue('brand_descrip', 'brand_id')}
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
                                              renderInput={(params) => <TextField {...params} label="Marcas *" error={this.state.validator.brand_id.error}
                                               className="textField" variant="outlined"/>}
                                            />
                                            </Grid>
                                   </Grid>

                                   <Grid container item xs={20} spacing={2}>
                                   <Grid item xs={12}>
                                   <TextField
                                    id="outlined-full-width"
                                    label="Descripcion"
                                    name="prod_descrip"
                                    error={this.state.validator.prod_descrip.error}
                                    helperText={this.state.validator.prod_descrip.message}
                                    style={{ margin: 8 }}
                                    value={this.state.prod_descrip}
                                    onChange={this.fieldsChange.bind(this)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                  />
                                </Grid>
                                </Grid>

                                   <Grid container item xs={20} spacing={2}>
                                   <Grid item xs={6}>
                                   <TextField
                                    id="outlined-full-width"
                                    label="Precio de venta"
                                    type="number"
                                    name="prod_sale_price"
                                    error={this.state.validator.prod_sale_price.error}
                                    helperText={this.state.validator.prod_sale_price.message}
                                    style={{ margin: 8 }}
                                    value={this.state.prod_sale_price}
                                    onChange={this.fieldsChange.bind(this)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                  />
                               </Grid>
                               <Grid item xs={6}>

                               <Autocomplete
                                id="combo-box-demo"
                                disableClearable
                                options={[
                                          { value: 5, label: '5%' },
                                          { value: 10, label: '10%' },

                                        ]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, values)=>this.selectsChange(e, values, 'prod_iva', 'prod_iva2')}
                                value={this.selectValue('prod_iva2', 'prod_iva')}
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
                                renderInput={(params) => <TextField {...params} label="% IVA *" error={this.state.validator.prod_iva.error}
                                helperText={this.state.validator.prod_iva.message} className="textField" variant="outlined"/>}
                              />
                           </Grid>
                               </Grid>



                              </Grid>
                              <br/>
                        {this.botonEdit()}
                        <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.handleClose} onClick={this.handleClose}>Cancelar</Button>


                </form>
                {showModalCategory}
                {showSnack}

    </div>
  );
  }
}
export default withRouter( withStyles(styles, { withTheme: true })(ProductForm));
