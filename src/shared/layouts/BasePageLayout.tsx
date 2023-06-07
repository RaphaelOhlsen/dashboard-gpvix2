import { ReactNode } from 'react';
import { Theme, Typography, useMediaQuery, Box } from '@mui/material';


interface IBasePageLayoutProps {
  children: ReactNode;
  title: string;
  toolBar?: ReactNode
}

const BasePageLayout: React.FC<IBasePageLayoutProps> = ({children, title, toolBar}) => {

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box 
      height='100%'
      display='flex'
      flexDirection='column'
      gap={1}
    >
      <Typography 
        variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        component='h1'
        overflow='hidden'
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        padding='10px 5px'
      >
        {title}
      </Typography>
      
      {toolBar && (
        <Box>
          {toolBar}
        </Box>
      )}
      

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};

export default BasePageLayout;