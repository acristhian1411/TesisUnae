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

 class BranchForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      setOpen: true,
      branch_id: 0,
      branch_descrip: '',
      brand_address: '',
      edit: false,
      errors: [],
      validator: {
        branch_descrip:{
          message:'',
          error: false,
        },
        brand_address:{
          message:'',
          error: false,
        }
      }
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChangeField1 = this.onChangeField1.bind(this)
    this.onChangeField2 = this.onChangeField2.bind(this)
    this.handleCreateObject = this.handleCreateObject.bind(this)
    this.handleUpdateObject = this.handleUpdateObject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
if (this.props.edit) {
  var id = this.props.branch.data.branch_id
  axios.get('api/branches/'+id).then(response => {
    this.setState({
      branch_id: response.data.data.branch_id,
      branch_descrip: response.data.data.branch_descrip,
      brand_address: response.data.data.brand_address,
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
     branch_descrip: e.target.value
   });
   this.props.changeAtribute(true);
 };

 onChangeField2 (e) {
  this.setState({
    brand_address: e.target.value
  });
  this.props.changeAtribute(true);
};

handleCreateObject (e) {
  e.preventDefault();
  var {branch_descrip, country_id} = this.state;
  var validator = {
    branch_descrip: {error: false,  message: ''},
  branch_: {error: false,  message: ''}
};
  var object_error = {};
  const object = {
    branch_descrip: this.state.branch_descrip.toUpperCase(),
    brand_address: this.state.brand_address.toUpperCase(),
    }
  const { history } = this.props
    axios.post('api/branches', {branch_descrip:object.branch_descrip, brand_address:object.brand_address })
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
    var {branch_descrip, country_id} = this.state;
    var validator = {branch_descrip: {error: false,  message: ''}};
    var object_error = {};
    const object = {
      branch_id: this.state.branch_id,
      branch_descrip: this.state.branch_descrip.toUpperCase(),
      brand_address: this.state.brand_address.toUpperCase(),
    }
    const id = object.branch_id
    axios.put(`api/branches/${id}`, {branch_descrip:object.branch_descrip, brand_address:object.brand_address })
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
          <h3>Formulario de Marcas</h3>
          <hr />
                <form  >

                  <div className='form-group'>
                    <TextField
                     id="outlined-full-width"
                     label="Descripcion"
                     error={this.state.validator.branch_descrip.error}
                     helperText={this.state.validator.branch_descrip.message}
                     style={{ margin: 8 }}
                     value={this.state.branch_descrip}
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
                     error={this.state.validator.brand_address.error}
                     helperText={this.state.validator.brand_address.message}
                     style={{ margin: 8 }}
                     value={this.state.brand_address}
                     onChange={this.onChangeField2}
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
export default withRouter( withStyles(styles, { withTheme: true })(BranchForm));
