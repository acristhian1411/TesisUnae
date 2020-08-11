import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, InputLabel, TextField, Button} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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

 class CityForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      setOpen: true,
      city_id: 0,
      city_descrip: '',
      edit: false,
      errors: [],
      validator: {
        city_descrip:{
          message:'',
          error: false,
        }
      }
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChangeField1 = this.onChangeField1.bind(this)
    this.handleCreateObject = this.handleCreateObject.bind(this)
    this.handleUpdateObject = this.handleUpdateObject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.city.data.city_id
  axios.get('api/cities/'+id).then(response => {
    this.setState({
      city_id: response.data.data.city_id,
      city_descrip: response.data.data.city_descrip,
    })
  })
}

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

  onChangeField1 (e) {
   this.setState({
     city_descrip: e.target.value
   });
   this.props.changeAtribute(true);
 };


handleCreateObject (e) {
  e.preventDefault();
  var {city_descrip} = this.state;
  var validator = {city_descrip: {error: false,  message: ''}};
  var object_error = {};
  const object = {
    city_descrip: this.state.city_descrip.toUpperCase(),
    }
  const { history } = this.props
    axios.post('api/cities', {city_descrip:object.city_descrip })
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
    var {city_descrip} = this.state;
    var validator = {city_descrip: {error: false,  message: ''}};
    var object_error = {};
    const object = {
      city_id: this.state.city_id,
      city_descrip: this.state.city_descrip.toUpperCase(),
    }
    const id = object.city_id
    axios.put(`api/cities/${id}`, {city_descrip:object.city_descrip })
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
  const { classes } = this.props;
  return (
    <div>
          <h3>Formulario de Ciudades</h3>
          <hr />
                <form  >

                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Descripcion"
                     error={this.state.validator.city_descrip.error}
                     helperText={this.state.validator.city_descrip.message}
                     style={{ margin: 8 }}
                     value={this.state.city_descrip}
                     onChange={this.onChangeField1}
                     fullWidth
                     margin="normal"
                     variant="outlined"
                   />
                  </div>
                        {this.botonEdit()}
                        <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.handleClose} onClick={this.handleClose}>Cancelar</Button>
                </form>
    </div>
  );
  }
}
export default withRouter( withStyles(styles, { withTheme: true })(CityForm));
