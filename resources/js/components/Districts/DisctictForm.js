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
import CityForm from '../Cities/CityForm';
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

 class DisctictForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      snack_open: false,
      message_success: '',
      open: true,
      setOpen: true,
      district_id:0,
      city_id: 0,
      city_descrip:'',
      district_descrip: '',
      modal_city: false,
      edit: false,
      errors: [],
      cities: [],
      validator: {
        district_descrip:{
          message:'',
          error: false,
        },
        city_id:{
          message:'',
          error: false,
        }
      }
    }

    this.updateState= () =>{
      this.setState({
        modal_city: false,
      });
      axios.get('api/cities').then(res=>{
        this.setState({cities: res.data.data});
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
    this.openModalCity = this.openModalCity.bind(this);
    this.selectValue= this.selectValue.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.openSnack = this.openSnack.bind(this);

  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.district.data.district_id
this.setState({
  district_id: this.props.district.data.district_id,
  city_id: this.props.district.data.city_id,
  city_descrip: this.props.district.data.city_descrip,
  district_descrip: this.props.district.data.district_descrip,
})
}
axios.get('api/cities').then(res=>{
  this.setState({cities: res.data.data});
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
  openModalCity(){
    this.setState({modal_city:true});
  };
  fieldChange2(e, values){
  // console.log(values);
  this.setState({city_id: values.value, city_descrip: values.label});
  this.props.changeAtribute(true);
}
  onChangeField1 (e) {
   this.setState({
     district_descrip: e.target.value
   });
   this.props.changeAtribute(true);
 };


handleCreateObject (e) {
  e.preventDefault();
  var {district_descrip, city_id} = this.state;
  var validator = {
    district_descrip: {error: false,  message: ''},
    city_id: {error: false,  message: ''}
};
  var object_error = {};
  const object = {
    district_descrip: this.state.district_descrip.toUpperCase(),
    city_id: this.state.city_id,
    }
    axios.post('api/districts', {district_descrip:object.district_descrip, city_id:object.city_id })
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
    var {district_descrip, city_id} = this.state;
    var validator = {
      district_descrip: {error: false,  message: ''},
      city_id: {error: false,  message: ''}
  };
    var object_error = {};
    const object = {
      district_descrip: this.state.district_descrip.toUpperCase(),
      city_id: this.state.city_id,
      }
    const id = this.props.district.data.district_id
    axios.put(`api/districts/${id}`, {district_descrip:object.district_descrip, city_id:object.city_id  })
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
  City() {
         return (this.state.cities.map(data => ({ label: data.city_descrip, value: data.city_id })));
       }
       selectValue(){
           return {label:this.state.city_descrip, value:this.state.city_id};
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
  var showModalCity;
  var showSnack;

if (this.state.modal_city) {
  showModalCity = <SmallModal >
                {{onHandleSubmit: this.updateState,
                  form: <CityForm />,
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
                            options={this.City()}
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
                            renderInput={(params) => <TextField {...params} error={this.state.validator.city_id.error}
                                                                helperText={this.state.validator.city_id.message}
                                                                label="Seleccione una Ciudad *"
                                                                variant="outlined"
                                                                fullWidth
                                                                onChange={this.searchFieldChange}
                                                                />}
                          />
                          <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} color="primary" onClick={this.openModalCity}>
                            Nueva Ciudad
                          </Button>

                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Descripcion"
                     error={this.state.validator.district_descrip.error}
                     helperText={this.state.validator.district_descrip.message}
                     style={{ margin: 8 }}
                     value={this.state.district_descrip}
                     onChange={this.onChangeField1}
                     fullWidth
                     margin="normal"
                     variant="outlined"
                   />
                  </div>
                        {this.botonEdit()}
                        <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.handleClose} onClick={this.handleClose}>Cancelar</Button>
                </form>
                {showModalCity}
                {showSnack}

    </div>
  );
  }
}
export default withRouter( withStyles(styles, { withTheme: true })(DisctictForm));
