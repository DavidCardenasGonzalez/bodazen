import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
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
    width: '100%',
    marginTop: 20,
  },
  avatar: {
  },
  name: {
    color: '#b7d0de !important',
    fontSize: 16,
    textAlign: 'center',
    margin: '0 15px',
    fontWeight: 700,
  },
}));

function Menu(props) {
  // eslint-disable-next-line react/prop-types
  const { drawerWidth } = props;
  const window = undefined;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useUser();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      </div>
      <div className={classes.name}>
        {user.name}
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon className={classes.menuIcon}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
