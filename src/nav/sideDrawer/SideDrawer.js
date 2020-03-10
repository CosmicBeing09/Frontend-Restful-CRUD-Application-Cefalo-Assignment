import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Login from '@material-ui/icons/LockOpen';
import Register from '@material-ui/icons/HowToReg';
import MyPost from '@material-ui/icons/Assignment';
import CreatePost from '@material-ui/icons/PostAdd'; 
import Logout from '@material-ui/icons/ExitToApp'; 
import Home from '@material-ui/icons/Home';
import { Link} from 'react-router-dom';
import swal from 'sweetalert';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const logout = () =>{
  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      window.localStorage.clear();
      swal({
        title: "Bingoo!",
        text: "Logged out!!!",
        icon: "success",
        button: "Ok",
      }).then(() => window.location.replace('/'));
    } else {
      swal("Not logged out!");
    }
  });
}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  var isLogged = false;
  if(window.localStorage.getItem("token") === null)
    isLogged = false;
  else 
    isLogged=true;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
         style={{backgroundColor:'#510619'}}
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
            CRUD App
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
        <div style={{backgroundColor : '#cccccc'}}>
        <div className={classes.toolbar}>
          <Typography variant="h6" noWrap >Navigate</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        </div>

        <Divider />
        <Divider />

        <div>
        <List>
          <ListItem button component={Link} to='/'>
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>

          <ListItem button component={Link} to='/login'>
            <ListItemIcon><Login/></ListItemIcon>
            <ListItemText primary='Login'/>
          </ListItem>

          <ListItem button component={Link} to='/register'>
            <ListItemIcon><Register/></ListItemIcon>
            <ListItemText primary='Register'/>
          </ListItem>
        </List>

        </div>
       {isLogged? (
         <div>
        <Divider />
        <Divider />
        <List>
          <ListItem button component={Link} to='/my-post'>
            <ListItemIcon><MyPost/></ListItemIcon>
            <ListItemText primary='My Posts'/>
          </ListItem>

          <ListItem button component={Link} to='/create-post'>
            <ListItemIcon><CreatePost/></ListItemIcon>
            <ListItemText primary='Create Post'/>
          </ListItem>
        </List>
        <Divider/>
        <Divider />
        <ListItem button onClick = {logout}>
            <ListItemIcon><Logout/></ListItemIcon>
            <ListItemText primary='Logout'/>
        </ListItem>
        </div>
       ):(<div></div>)
}
      </Drawer>
        <div className={classes.toolbar} />
    </div>
  )
}