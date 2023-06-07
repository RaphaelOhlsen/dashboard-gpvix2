import { FC, ReactNode } from 'react';
import { 
  useMediaQuery, 
  useTheme, 
  Box} from '@mui/material';


import SideBar from '../components/SideBar/SideBar';
import NavBar from '../components/Navbar';


interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({children}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <SideBar />
      <NavBar/>
      <Box 
        marginLeft={smDown ? 0 : theme.spacing(24)}
        marginTop={theme.spacing(8)}
        height='90vh'
      >
        {children}
      </Box>
    </>
    
  );
};

export default MainLayout;