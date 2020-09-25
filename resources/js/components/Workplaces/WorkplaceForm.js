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

 class WorkplaceForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      setOpen: true,
      wplace_id: 0,
      description: '',
      address: '',
      telephone: '',
      edit: false,
      errors: [],
      validator: {
        description:{
          message:'',
          error: false,
        },
        address:{
          message:'',
          error: false,
        },
        telephone:{
          message:'',
          error: false,
        }
      }
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChangeField1 = this.onChangeField1.bind(this)
    this.onChangeField2 = this.onChangeField2.bind(this)
    this.onChangeField3 = this.onChangeField3.bind(this)
    this.handleCreateObject = this.handleCreateObject.bind(this)
    this.handleUpdateObject = this.handleUpdateObject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.workplace.data.wplace_id
  axios.get('api/workplaces/'+id).then(response => {
    this.setState({
      wplace_id: response.data.data.wplace_id,
      description: response.data.data.description,
      address: response.data.data.address,
      telephone: response.data.data.telephone,
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
     description: e.target.value
   });
   this.props.changeAtribute(true);
 };
 onChangeField2 (e) {
  this.setState({
    address: e.target.value
  });
  this.props.changeAtribute(true);
};
onChangeField3 (e) {
 this.setState({
   telephone: e.target.value
 });
 this.props.changeAtribute(true);
};
handleCreateObject (e) {
  e.preventDefault();
  var {description, address, telephone} = this.state;
  var validator = {
    description: {error: false,  message: ''},
    address: {error: false,  message: ''},
    telephone: {error: false,  message: ''}
  };
  var object_error = {};
  const object = {
    description: this.state.description.toUpperCase(),
    address: this.state.address.toUpperCase(),
    telephone: this.state.telephone,
    }
    axios.post('api/workplaces', {description:object.description, address:object.address, telephone:object.telephone  })
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
    var {description, address, telephone} = this.state;
    var validator = {
      description: {error: false,  message: ''},
      address: {error: false,  message: ''},
      telephone: {error: false,  message: ''}
    };    var object_error = {};
    const object = {
      wplace_id: this.state.wplace_id,
      description: this.state.description.toUpperCase(),
      address: this.state.address.toUpperCase(),
      telephone: this.state.telephone,
    }
    const id = object.wplace_id
    axios.put(`api/workplaces/${id}`, {description:object.description, address:object.address, telephone:object.telephone})
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
          <h3>Formulario de Lugares de trabajo</h3>
          <hr />
                <form  >

                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Descripcion"
                     error={this.state.validator.description.error}
                     helperText={this.state.validator.description.message}
                     style={{ margin: 8 }}
                     value={this.state.description}
                     onChange={this.onChangeField1}
                     fullWidth
                     margin="normal"
                     variant="outlined"
                   />
                  </div>
                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Direccion"
                     error={this.state.validator.address.error}
                     helperText={this.state.validator.address.message}
                     style={{ margin: 8 }}
                     value={this.state.address}
                     onChange={this.onChangeField2}
                     fullWidth
                     margin="normal"
                     variant="outlined"
                   />
                  </div>
                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Telefono"
                     error={this.state.validator.telephone.error}
                     helperText={this.state.validator.telephone.message}
                     style={{ margin: 8 }}
                     value={this.state.telephone}
                     onChange={this.onChangeField3}
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
export default withRouter( withStyles(styles, { withTheme: true })(WorkplaceForm));
