import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Grid, Stepper, Step, StepLabel, Divider, Backdrop, Fade, InputLabel, TextField, Button, Snackbar} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Autocomplete } from '@material-ui/lab';
import { Alert } from '@material-ui/lab';
import SmallModal from '../Modals/SmallModal';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CityForm from '../Cities/CityForm';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
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

function getSteps() {
  return ['Paso 1', 'Paso 2', 'Paso 3'];
}
 class ProviderForm extends Component  {

  constructor (props) {
    super(props)
    this.state = {
      snack_open: false,
      message_success: '',
      open: true,
      activeStep: 0,
      setOpen: true,
      person_id:0,
      nombre:'',
      last_name:'',
      cedula:'',
      ruc:'',
      home_address:'',
      prov_activo:false,
      obs:'',
      district_id: 0,
      district_descrip: 0,
      city_id: 0,
      city_descrip:'',
      business_name: '',
      modal_distric: false,
      edit: false,
      errors: [],
      cities: [],
      districts: [],
      validator: {
        home_address:{
          message:'',
          error: false,
        },
        business_name:{
          message:'',
          error: false,
        },
        ruc:{
          message:'',
          error: false,
        },
        obs:{
          message:'',
          error: false,
        },
        district_id:{
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
        modal_distric: false,
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
    this.openModalDistrict = this.openModalDistrict.bind(this);
    this.selectValue= this.selectValue.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.openSnack = this.openSnack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.selectsChange = this.selectsChange.bind(this);// homecity_id:0,
    this.fieldsChange = this.fieldsChange.bind(this);// homecity_id:0,

  }
  handleNext(){
       // const {person_fname, person_lastname, birthplace_id, homecity_id, country_id,
       // person_birthdate, person_gender, person_idnumber, person_address,
       // person_bloodtype,person_business_name, person_ruc,person_photo} = this.state;
       // if (validator.prototype.validated([{person_fname},{person_lastname},
       //   {birthplace_id}, {homecity_id}, {country_id},
       //   {person_birthdate}, {person_gender}, {person_idnumber}, {person_address},
       //   {person_bloodtype}, {person_ruc}],this.updateField)===true) {

         this.setState({activeStep: this.state.activeStep+1});
       // }

    };
    handleBack(){
  this.setState({activeStep: this.state.activeStep-1});
};

handleReset(){
  this.setState({activeStep: 0});
};
  componentDidMount () {
if (this.props.edit) {
  var id = this.props.provider.data.person_id
this.setState({
  person_id: this.props.provider.data.person_id,
  district_id: this.props.provider.data.district_id,
  district_descrip: this.props.provider.data.district_descrip,
  city_descrip: this.props.provider.data.city_descrip,
  business_name: this.props.provider.data.business_name,
  home_address: this.props.provider.data.home_address,
  ruc: this.props.provider.data.ruc,
  obs: this.props.provider.data.obs,
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
  openModalDistrict(){
    this.setState({modal_distric:true});
  };
  fieldChange2(e, values){
  // console.log(values);
  this.setState({district_id: values.value, cat_descript: values.label});
  this.props.changeAtribute(true);
}
fieldsChange(e){
  e.preventDefault();
  // console.log(e.target.name);
  this.setState({[e.target.name]: e.target.value});
  this.props.changeAtribute(true);
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
selectValue(name, label){
  return {label:this.state[name], value:this.state[label]};
}
  onChangeField1 (e) {
   this.setState({
     business_name: e.target.value
   });
   this.props.changeAtribute(true);
 };


handleCreateObject (e) {
  e.preventDefault();
  var {business_name, district_id} = this.state;
  var validator = {
    business_name: {error: false,  message: ''},
    home_address: {error: false,  message: ''},
    ruc: {error: false,  message: ''},
    obs: {error: false,  message: ''},
    district_id: {error: false,  message: ''}
};
  var object_error = {};
  const object = {
    nombre: this.state.business_name.toUpperCase(),
    last_name: this.state.business_name.toUpperCase(),
    business_name: this.state.business_name.toUpperCase(),
    obs: this.state.obs,
    home_address: this.state.home_address,
    prov_activo: true,
    ruc: this.state.ruc,
    cedula: this.state.ruc,
    district_id: this.state.district_id,
    }
    axios.post('api/providers', {business_name:object.business_name, nombre:object.nombre, last_name:object.last_name, cedula:object.cedula, ruc:object.ruc, home_address:object.home_address, prov_activo:object.prov_activo, obs:object.obs, district_id:object.district_id })
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
    var {business_name, district_id} = this.state;
    var validator = {
      business_name: {error: false,  message: ''},
      home_address: {error: false,  message: ''},
      ruc: {error: false,  message: ''},
      obs: {error: false,  message: ''},
      district_id: {error: false,  message: ''}
  };
    var object_error = {};
    const object = {
      nombre: this.state.business_name.toUpperCase(),
      last_name: this.state.business_name.toUpperCase(),
      business_name: this.state.business_name.toUpperCase(),
      obs: this.state.obs,
      home_address: this.state.home_address,
      prov_activo: true,
      ruc: this.state.ruc,
      cedula: this.state.ruc,
      district_id: this.state.district_id,
      }
    const id = this.props.provider.data.person_id
    axios.put(`api/providers/${id}`, {business_name:object.business_name, nombre:object.nombre, last_name:object.last_name, cedula:object.cedula, ruc:object.ruc, home_address:object.home_address, prov_activo:object.prov_activo, obs:object.obs, district_id:object.district_id })
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
         return (this.state.cities.map(data => ({ label: data.cat_descript, value: data.district_id })));
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
  City() {
        return (this.state.cities.map(data => ({ label: data.city_descrip, value: data.city_id })));
   }
   District() {
         return (this.state.districts.map(data => ({ label: data.district_descrip, value: data.district_id })));
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

if (this.state.modal_distric) {
  showModalCategory = <SmallModal >
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
                <h3 align='center'>Formulario de Proveedores</h3>

  <Divider />
<br/>
  <Grid container spacing={1}>
  <Grid container item xs={20} spacing={2}>
  <Grid item xs={6}>
                      <Autocomplete
                        id="combo-box-demo"
                        disableClearable
                        options={this.City()}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, values)=>this.selectsChange(e, values, 'city_id', 'city_descrip', 'districts', 'districts')}
                        value={this.selectValue('city_descrip', 'city_id')}
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
                        renderInput={(params) => <TextField {...params} label="Ciudad *" error={this.state.validator.city_id.error}
                         className="textField" variant="outlined"/>}
                      />
  </Grid>
  <Grid item xs={6}>
  <Autocomplete
                        id="combo-box-demo"
                        disableClearable
                        options={this.District()}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, values)=>this.selectsChange(e, values, 'district_id', 'district_descrip', 'districts', 'districts')}
                        value={this.selectValue('district_descrip', 'district_id')}
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
                        renderInput={(params) => <TextField {...params} label="Barrio *" error={this.state.validator.district_id.error}
                         className="textField" variant="outlined"/>}
                      />
  </Grid>
  </Grid>
  <Grid container item xs={20} spacing={1}>
  <Grid  item xs={12} >

  <TextField
          id="outlined-basic"
          label="Direccion"
          fullWidth
          style={{ margin: 8 }}
          value={this.state.home_address}
          name="home_address"
          onChange={this.fieldsChange.bind(this)}
          margin="normal"
          variant="outlined"
          error={this.state.validator.home_address.error}
          helperText={this.state.validator.home_address.message}
        />
  </Grid>
  </Grid>
  <Grid container item xs={20} spacing={2}>

  <Grid item xs={6}>
  <TextField
          id="outlined-basic"
          label="Razon social"
          fullWidth
          style={{ margin: 8 }}
          value={this.state.business_name}
          name="business_name"
          onChange={this.fieldsChange.bind(this)}
          margin="normal"
          variant="outlined"
          error={this.state.validator.business_name.error}
          helperText={this.state.validator.business_name.message}
        />
  </Grid>
  <Grid item xs={6}>
  <TextField
          id="outlined-basic"
          label="Ruc"
          fullWidth
          style={{ margin: 8 }}
          value={this.state.ruc}
          name="ruc"
          onChange={this.fieldsChange.bind(this)}
          margin="normal"
          variant="outlined"
          error={this.state.validator.ruc.error}
          helperText={this.state.validator.ruc.message}
        />
  </Grid>

  <Grid container item xs={20} spacing={2}>
  <Grid  item xs={12} >

  <TextField
    id="outlined-basic"
    label="Observaciones"
    className="textField"
    multiline={true}
    fullWidth
    rows='3'
    style={{ margin: 8 }}
    value={this.state.obs}
    name="obs"
    onChange={this.fieldsChange.bind(this)}
    margin="normal"
    variant="outlined"
  />
  </Grid>
  </Grid>
  </Grid>

  </Grid>
  <br/>
  {this.botonEdit()}


                {showModalCategory}
                {showSnack}

    </div>
  );
  }
}
export default withRouter( withStyles(styles, { withTheme: true })(ProviderForm));
