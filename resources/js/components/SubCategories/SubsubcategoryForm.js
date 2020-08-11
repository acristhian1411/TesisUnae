import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, InputLabel, TextField, Button, Snackbar} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Autocomplete } from '@material-ui/lab';
import { Alert } from '@material-ui/lab';
import SmallModal from '../Modals/SmallModal';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CategoriesForm from '../Categories/CategoriesForm';
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

 class SubsubcategoryForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      snack_open: false,
      message_success: '',
      open: true,
      setOpen: true,
      sub_cat_id:0,
      cat_id: 0,
      cat_descript:'',
      sub_cat_descrip: '',
      modal_category: false,
      edit: false,
      errors: [],
      categories: [],
      validator: {
        sub_cat_descrip:{
          message:'',
          error: false,
        },
        cat_id:{
          message:'',
          error: false,
        }
      }
    }

    this.updateState= () =>{
      this.setState({
        modal_category: false,
      });
      axios.get('api/categories').then(res=>{
        this.setState({categories: res.data.data});
        });

    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChangeField1 = this.onChangeField1.bind(this)
    this.fieldChange2 = this.fieldChange2.bind(this)
    this.handleCreateObject = this.handleCreateObject.bind(this)
    this.handleUpdateObject = this.handleUpdateObject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.openModalCategory = this.openModalCategory.bind(this);
    this.selectValue= this.selectValue.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.openSnack = this.openSnack.bind(this);

  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.subcategory.data.sub_cat_id
this.setState({
  sub_cat_id: this.props.subcategory.data.sub_cat_id,
  cat_id: this.props.subcategory.data.cat_id,
  cat_descript: this.props.subcategory.data.cat_descript,
  sub_cat_descrip: this.props.subcategory.data.sub_cat_descrip,
})
}
axios.get('api/categories').then(res=>{
  this.setState({categories: res.data.data});
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
  openModalCategory(){
    this.setState({modal_category:true});
  };
  fieldChange2(e, values){
  // console.log(values);
  this.setState({cat_id: values.value, cat_descript: values.label});
  this.props.changeAtribute(true);
}
  onChangeField1 (e) {
   this.setState({
     sub_cat_descrip: e.target.value
   });
   this.props.changeAtribute(true);
 };


handleCreateObject (e) {
  e.preventDefault();
  var {sub_cat_descrip, cat_id} = this.state;
  var validator = {
    sub_cat_descrip: {error: false,  message: ''},
    cat_id: {error: false,  message: ''}
};
  var object_error = {};
  const object = {
    sub_cat_descrip: this.state.sub_cat_descrip.toUpperCase(),
    cat_id: this.state.cat_id,
    }
    axios.post('api/subcategories', {sub_cat_descrip:object.sub_cat_descrip, cat_id:object.cat_id })
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
    var {sub_cat_descrip, cat_id} = this.state;
    var validator = {
      sub_cat_descrip: {error: false,  message: ''},
      cat_id: {error: false,  message: ''}
  };
    var object_error = {};
    const object = {
      sub_cat_descrip: this.state.sub_cat_descrip.toUpperCase(),
      cat_id: this.state.cat_id,
      }
    const id = this.props.subcategory.data.sub_cat_id
    axios.put(`api/subcategories/${id}`, {sub_cat_descrip:object.sub_cat_descrip, cat_id:object.cat_id  })
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
       selectValue(){
           return {label:this.state.cat_descript, value:this.state.cat_id};
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

if (this.state.modal_category) {
  showModalCategory = <SmallModal >
                {{onHandleSubmit: this.updateState,
                  form: <CategoriesForm />,
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
          <h3>Formulario de SubCategorias</h3>
          <hr />
                <form  >
                <Autocomplete
                            id="combo-box-demo"
                            disableClearable
                            options={this.Category()}
                            getOptionLabel={(option) => option.label}
                            onChange={this.fieldChange2.bind(this)}
                            value={this.selectValue()}
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
                            renderInput={(params) => <TextField {...params} error={this.state.validator.cat_id.error}
                                                                helperText={this.state.validator.cat_id.message}
                                                                label="Seleccione una Categoria *"
                                                                variant="outlined"
                                                                fullWidth
                                                                onChange={this.searchFieldChange}
                                                                />}
                          />
                          <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} color="primary" onClick={this.openModalCategory}>
                            Nueva Categoria
                          </Button>

                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Descripcion"
                     error={this.state.validator.sub_cat_descrip.error}
                     helperText={this.state.validator.sub_cat_descrip.message}
                     style={{ margin: 8 }}
                     value={this.state.sub_cat_descrip}
                     onChange={this.onChangeField1}
                     fullWidth
                     margin="normal"
                     variant="outlined"
                   />
                  </div>
                        {this.botonEdit()}
                        <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.handleClose} onClick={this.handleClose}>Cancelar</Button>
                </form>
                {showModalCategory}
                {showSnack}

    </div>
  );
  }
}
export default withRouter( withStyles(styles, { withTheme: true })(SubsubcategoryForm));
