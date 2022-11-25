import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Auth } from 'aws-amplify';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useUser } from '../UserContext';

const useStyles = makeStyles(() => ({
  menu: {
    backgroundColor: '#fff343',
    color: 'white',
  },
  menuIcon: {
    color: '#b7d0de !important',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    marginTop: 50,
  },
  avatar: {
    // border: '2px solid #b7d0de !important',
    boxShadow: '2px 2px 5px #1c1b1b',
  },
  name: {
    color: '#b7d0de !important',
    fontSize: 16,
    textAlign: 'center',
    margin: '0 15px',
    fontWeight: 700,
    paddingTop: 30,
  },
  logoutButton: {
    color: '#b7d0de !important',
    fontSize: '11px !important',
    textAlign: 'center',
  },
  divider: {
    borderColor: '#b7d0de !important',
    margin: '15px !important',
  },
}));

function Menu(props) {
  // eslint-disable-next-line react/prop-types
  const { drawerWidth } = props;
  const window = undefined;
  const history = useHistory();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useUser();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const signOut = () => {
    Auth.signOut().finally((window.location.href = '/'));
  };

  const drawer = (
    <div>
      <div className={classes.avatarContainer}>
        <Avatar
          className={classes.avatar}
          // ref={anchorRef}
          src={user.pictureURL}
          sx={{ width: 130, height: 130 }}

          // onClick={handleToggle}
        />
        <div className={classes.name}>{user.name}</div>
        <Button onClick={signOut} className={classes.logoutButton} variant="text">
          Cerrar Sesión
        </Button>
      </div>
      <Divider className={classes.divider} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              history.push('/users');
            }}
          >
            <ListItemIcon className={classes.menuIcon}>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              history.push('/employees');
            }}
          >
            <ListItemIcon className={classes.menuIcon}>
              <Diversity3Icon />
            </ListItemIcon>
            <ListItemText primary="Empleados" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        className={classes.menu}
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#102E4A',
            color: 'white',
          },
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#102E4A',
            color: 'white',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Menu;
