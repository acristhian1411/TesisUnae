import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';
/*
Este componente recibe las props de:
 onClose() <- esto para desabilitar el open del Dialog
 onHandleAgree() <- esto para manejar si el usuario esta de acuerdo, generalmente activa la funcion
  close modal;
 ejemplo:
 <DialogAlertClose onClose={this.handleClose} onHandleAgree={this.destroy}/>
*/
export default class DialogAlertClose extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleAgree = this.handleAgree.bind(this);
  }
  handleClose(){
    this.setState({open:false});
    this.props.onClose();
  }
  handleAgree(){
    this.setState({open:false});
    this.props.onHandleAgree();
  }
  componentDidMount(){
    // console.log(this.props);
  }
  render(){
    return(
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{`Se perderan los cambios. Esta seguro?`}</DialogTitle>
      <DialogActions>
        <Button color="primary" autoFocus onClick={this.handleClose}>
          Cancelar
        </Button>
        <Button color="secondary" variant="outlined" onClick={this.handleAgree}>
          De acuerdo
        </Button>
      </DialogActions>
      </Dialog>
    );
  }
}
