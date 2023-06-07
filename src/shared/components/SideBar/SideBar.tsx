import { FC } from 'react';
import { 
  useMediaQuery, 
  Typography, 
  useTheme, 
  Drawer, 
  List, 
  Box} from '@mui/material';

import ListIItemLink from './ListItemLink';

import { useAppThemeContext } from '../../contexts';
import { useDrawerContext } from '../../contexts';

import logo from '../../../assets/logo.png';

import { useAuthContext } from '../../contexts';

const SideBar: FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  const { themeName } = useAppThemeContext();
  const { role } = useAuthContext();

  return (
    <Drawer
      open={isDrawerOpen}
      variant={smDown ? 'temporary' : 'permanent'}
      onClose={toggleDrawerOpen}
      sx={{
        '& .MuiDrawer-paper': {
          borderRight: 0,
          backgroundColor: themeName === 'dark' ?  '#303134' : theme.palette.primary.main,
          boxSizing: 'border-box',
          width: theme.spacing(24),
        }
      }}
    >
      <Box
        height='100%'
        display='flex' 
        flexDirection='column'
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='64px'
        >
          <Box
            component='img'
            alt='profile'
            src={logo}
            height='54px'
            width='54px'
          />
          <Typography fontSize={smDown ? '1.2rem' : '1.5rem'}>
              GPVIX
          </Typography>
        </Box>
          
        <Box flex={1}>
          <List component='nav' 
            sx={{
              padding: '0px',
              backgroundColor: themeName === 'dark' ?  '#303134' : theme.palette.primary.main,
            }}
          >
            {drawerOptions.map(drawerOption => (
              drawerOption.allowedRoles.includes(role) &&
              <ListIItemLink
                key={drawerOption.path}
                icon={drawerOption.icon}
                label={drawerOption.label}
                to={drawerOption.path}
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
            ))}
          </List>   
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideBar;