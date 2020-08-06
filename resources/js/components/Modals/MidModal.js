import React, {Component} from 'react';
import {Modal, Backdrop, Fade, Button, IconButton} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DialogAlertClose from '../Dialogs/DialogAlertClose';
/*
  Se llama utilizando children props, en el cual se le deben pasar los siguientes,
  onHandleSubmit: el cual es para actualizar el estado de la tabla al Cerrar,
  form: aqui se le pasa el componente que contiene el formulario
  props_form: los props del componente formulario se le pasa de esta manera en
    forma de objeto
    ejemplo:
      <MidModal >
        {{onHandleSubmit: this.updateState,
          form: <FormDepartment />,
          props_form: {edit: true, department:department}
        }}
      </ MidModal>
  Nota; Si se necesita un modal más pequeño, puede usar <SmallModal />, recibe los mismos props.
*/
class MidModal extends Component {
   constructor(props){
     super(props)
     this.state = {
       open: true,
       openDialog: false,
       changes: false
       }
       this.handleOpen = this.handleOpen.bind(this);
       this.handleClose = this.handleClose.bind(this);
       this.handleClose1 = this.handleClose1.bind(this);
       this.handleCloseDialog = this.handleCloseDialog.bind(this);
       this.hasChanges =  this.hasChanges.bind(this);
     }
   handleOpen(){
     this.setState({open:true});
   };
   handleClose(){
     this.setState({open:false});
     this.props.children.onHandleSubmit();
   }
   handleClose1(){
     if (this.state.changes) {
       this.setState({openDialog:true});
     }
     else {
       this.handleClose();
     }
   }
   handleCloseDialog(){
     this.setState({openDialog: false});
   }
   hasChanges(res){
     // console.log(res);
     this.setState({changes:res});
   }
   componentDidMount(){

    }
   render(){
     var showDialogClose;
        if (this.state.openDialog) {
          showDialogClose = <DialogAlertClose onClose={this.handleCloseDialog} onHandleAgree={this.handleClose}/>;
        }

     const FormContainer = this.props.children.form.type;
     // console.log(FormContainer);
     const {props_form} = this.props.children;
     return (

        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={this.state.open}
            onClose={this.handleClose1}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
           <Fade in={this.state.open}>
               <div className="paper">
               <IconButton style={{float:'right', marginRight: -20}} aria-label="close" onClick={this.handleClose1}>
                  <CloseIcon />
                </IconButton>
                <FormContainer {...props_form} onHandleSubmit={this.handleClose} changeAtribute={this.hasChanges}/>
                {/*<Button style={{float: 'left'}} variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.handleClose}>Cerrar</Button>
              */}</div>
            </Fade>
          </Modal>
          {showDialogClose}
        </div>
       );
   }
 }
export default MidModal;
