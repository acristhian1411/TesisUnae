
    import React from 'react'
    import { BrowserRouter as Router, Link } from 'react-router-dom'
    import { makeStyles, useTheme } from '@material-ui/core/styles';
    import {Drawer, CssBaseline, AppBar, Toolbar, List,
            Typography, Divider, IconButton, ListItem,
            ListItemIcon, ListItemText
            } from '@material-ui/core';

    import MenuIcon from '@material-ui/icons/Menu';
    import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
    import ChevronRightIcon from '@material-ui/icons/ChevronRight';
    import ExpandLess from '@material-ui/icons/ExpandLess';
    import ExpandMore from '@material-ui/icons/ExpandMore';
    import StarBorder from '@material-ui/icons/StarBorder';
    import Collapse from '@material-ui/core/Collapse';
    import PersonIcon from '@material-ui/icons/Person';
    import HomeIcon from '@material-ui/icons/Home';
    import TrendingUpIcon from '@material-ui/icons/TrendingUp';
    import ListIcon from '@material-ui/icons/List';
    import SchoolIcon from '@material-ui/icons/School';
    import MailIcon from '@material-ui/icons/Mail';
    import clsx from 'clsx';
    import Routes from './Routes';
    import InboxIcon from '@material-ui/icons/MoveToInbox';

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

    function Header () {
      const classes = useStyles();
   const theme = useTheme();
   const [open, setOpen] = React.useState(false);
   const [open2, setOpen2] = React.useState(false);
   const [open3, setOpen3] = React.useState(false);
   const [open4, setOpen4] = React.useState(false);

   const handleDrawerOpen = () => {
     setOpen(true);
   };

   const handleDrawerClose = () => {
     setOpen(false);
   };
   const handleClick = () => {
      setOpen2(!open2);
    };

    const handleClick2 = () => {
       setOpen3(!open3);
     };

     const handleClick3 = () => {
        setOpen4(!open4);
      };

    return(
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TSystem
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Link className='navbar-brand' to='/'>
     <ListItem button >
       <ListItemIcon>
        {<HomeIcon />}
        </ListItemIcon>
        Inicio
     </ListItem>
     </Link>

     <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Academica" />
      {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>

       <Link className='navbar-brand' to='/cargos'>
      <ListItem button >
        <ListItemIcon>
         {<ListIcon />}
         </ListItemIcon>
         Cargos

      </ListItem>
      </Link>


      </List>
      </Collapse>


      <ListItem button onClick={handleClick3}>
      <ListItemIcon>
      <TrendingUpIcon />
      </ListItemIcon>
      <ListItemText primary="Administrativa" />
      {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>

      <List component="div" disablePadding>


      </List>

      </Collapse>


      <ListItem button onClick={handleClick2}>
      <ListItemIcon>
      <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Personas" />
      {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>


      </List>
      </Collapse>

        </List>

      </Drawer>

      <main className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}>
              <div className={classes.toolbar} />
              <Routes />

            </main>




        </div>
          )

}

    export default Header
