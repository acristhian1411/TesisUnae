import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography, List, ListItem, ListItemText, Divider} from '@material-ui/core';
import { Card } from 'react-bootstrap';
//import ContactPersonsList from '../ContactPersons/ContactPersonsList';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 140,
  },
});

class BuyShow extends Component{
  constructor(props){
    super(props)
    this.state = {
      persons: {},
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
      const id = this.props.match.params.id
      axios.get(`/api/providers/${id}`).then(response => {
        this.setState({
          persons: response.data.data
        })
      })
    }

    handleChange (event, value) {
        this.setState({ value });
      };


render(){

  const { classes } = this.props;
  const {persons, value} = this.state;
  return(

    <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Datos" />
                <Tab label="Ultimas compras" />
                <Tab label="Funcionario" />
                <Tab label="Profesor" />
                <Tab label="Contactos" />

              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>
              <div className="card_person">
                {/*  <img className="profile_photo" src={`/img/${persons.person_photo}`} />*/}
                  <div className="card_label_field">
                    <p className="title_column">Razon Social </p>
                    <p className="value_column">{persons.business_name}</p>
                    <p className="title_column">Ruc </p>
                    <p className="value_column">{persons.ruc}</p>
                    <p className="title_column">Documento </p>
                    <p className="value_column">----</p>
                    <p className="title_column">Celular </p>
                    <p className="value_column">----</p>
                    <p className="title_column">Correo </p>
                    <p className="value_column">----</p>
                  </div>
              </div>
              <div className="card_person1">
                  <div className="card_label_field">
                    <p className="title_column">Sexo </p>
                    <p className="value_column">{persons.person_gender}</p>
                    <p className="title_column">Pais de Nacionalidad </p>
                    <p className="value_column">{persons.country_name}</p>
                    <p className="title_column">Dirección </p>
                    <p className="value_column">{persons.person_address}</p>
                    <p className="title_column">Tipo de sangre </p>
                    <p className="value_column">{persons.person_bloodtype}</p>
                    <p className="title_column">Situación Ocupacional </p>
                    <p className="value_column">---</p>
                    <p className="title_column">Estado Civil</p>
                    <p className="value_column">---</p>
                  </div>
              </div>
              </TabContainer>}
            {value === 1 && <TabContainer>Item Dos</TabContainer>}
            {value === 2 && <TabContainer>Item Tres</TabContainer>}
            {value === 3 && <TabContainer>Item cuatro</TabContainer>}
            {value === 4 && <TabContainer>
            {/*  <ContactPersonsList cperson={persons.person_id} />*/}Item cinco
              </TabContainer>}

          </div>

  )
}


}

BuyShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuyShow);
