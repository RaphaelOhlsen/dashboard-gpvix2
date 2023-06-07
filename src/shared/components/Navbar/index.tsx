import { MouseEvent, useState, FC } from 'react';
import { 
  AppBar,
  Icon, 
  IconButton, 
  Toolbar, 
  useMediaQuery, 
  Theme, 
  Avatar, 
  useTheme, 
  Button, 
  Typography, 
  Menu, 
  MenuItem, 
  Popover, 
  Box
} from '@mui/material';
import { ArrowDropDownOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { LightModeOutlined, DarkModeOutlined, } from '@mui/icons-material';
import { useDrawerContext, useAppThemeContext, useAuthContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';

import profileImage from '../../../assets/avatar.jpg';

const useStyles = makeStyles({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: '10px',
  },
});

const NavBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverAnchoeEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const {logout} = useAuthContext();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setIsPopoverOpen(false);
  };

  const handleClose = () => setAnchorEl(null);

  const classes = useStyles();

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();
  const { themeName, toggleTheme } = useAppThemeContext();

  const navigate = useNavigate();

  return (
    <AppBar
      position='fixed'
      elevation={0}
    >
      <Toolbar 
        style={{ justifyContent: 'space-between' }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          {smDown && ( 
            <IconButton onClick={toggleDrawerOpen}>
              <Icon style={{ color: theme.palette.primary.contrastText}}>
                menu
              </Icon>
            </IconButton>
          )}
        </Box>
        <Box
          display='flex'
          gap='1rem'
        >  
          <IconButton 
            onMouseEnter={handlePopoverOpen} 
            onMouseLeave={handlePopoverClose} 
            onClick={toggleTheme}
            
          >
            {themeName === 'light' ? 
              <LightModeOutlined sx={{ fontSize: '25px'}}/> : 
              <DarkModeOutlined sx={{ fontSize: '25px'}} />}
          </IconButton>
          <Popover
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={isPopoverOpen}
            anchorEl={popoverAnchoeEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: (themeName === 'light') ? '#f4c85b' : '#303134',
              }
            }}
          >
            {
              themeName === 'light' ? 
                (
                  <Typography variant='subtitle2'>
                    Trocar para Dark Theme
                  </Typography>
                ): (
                  <Typography variant='subtitle2'>
                    Trocar para Light Theme
                  </Typography>
                )}
          </Popover>
          
          <Button
            onClick={handleClick}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textTransform: 'none',
              gap: '.6rem'
            }}
          >
            <Avatar 
              sx={{ height: theme.spacing(6), width: theme.spacing(6)}} 
              alt='user' src={profileImage} 
            />
            <Box textAlign='left'>
              <Typography
                fontWeight='bold'
                fontSize='0.85rem'
                sx={{ color: (themeName === 'light') ? '#333' : '#fff' }}
              >
              Raphael
              </Typography>
              <Typography
                fontSize='0.75rem'
                sx={{ color: (themeName === 'light') ? '#333' : '#fff' }}
              >
              Administrador
              </Typography>
            </Box>
            <ArrowDropDownOutlined
              sx={{ 
                color: (themeName === 'light') ? '#333' : '#fff',
                fontSize: '25px'
              }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: (themeName === 'light') ? '#f4c85b' : '#303134',
              }
            }}
          >
            <MenuItem
              onClick={() => {
                navigate('/login');
                logout();
              }}
            >
              <Typography variant='subtitle2'>
                Log Out
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
