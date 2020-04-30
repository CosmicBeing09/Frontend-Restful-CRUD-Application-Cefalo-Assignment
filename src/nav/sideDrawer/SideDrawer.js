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
import translate from '../../i18n/translate';

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
    }
  });
}

function MiniDrawer(props) {
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
          <Typography variant="h6" noWrap >{translate('navigate')}</Typography>
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
            <ListItemText primary={translate('home')}/>
          </ListItem>

          <ListItem button component={Link} to='/login'>
            <ListItemIcon><Login/></ListItemIcon>
            <ListItemText primary={translate('login')}/>
          </ListItem>

          <ListItem button component={Link} to='/register'>
            <ListItemIcon><Register/></ListItemIcon>
            <ListItemText primary={translate('register')}/>
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
            <ListItemText primary={translate('myPosts')}/>
          </ListItem>

          <ListItem button component={Link} to='/create-post'>
            <ListItemIcon><CreatePost/></ListItemIcon>
            <ListItemText primary={translate('createPost')}/>
          </ListItem>
        </List>   
        <Divider/>
        <Divider/>
        <ListItem button onClick = {logout}>
            <ListItemIcon><Logout/></ListItemIcon>
            <ListItemText primary={translate('logout')}/>
        </ListItem>
        </div>
       ):(<div></div>)
}
      </Drawer>
        <div className={classes.toolbar} />
    </div>
  )
}


export default MiniDrawer;