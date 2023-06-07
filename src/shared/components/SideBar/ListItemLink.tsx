import { 
  Icon, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  useTheme } from '@mui/material';

import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

import { useAppThemeContext } from '../../contexts';

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick?: (() => void) | undefined;
}

const ListIItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });
  const theme = useTheme();

  const { themeName } = useAppThemeContext();

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton 
      selected={!!match}
      onClick={handleClick}
      sx={{
        '&.Mui-selected': {
          backgroundColor: themeName === 'dark' ? '#3b3232' : theme.palette.primary.dark,
          // color: theme.palette.secondary.light,
          // borderTop: '1px solid',
          // borderBottom: '1px solid',
          // borderColor: '#21295d'
        },
        '&:hover': {
          // backgroundColor: theme.palette.primary.dark,
          // color: theme.palette.secondary.light,
        },
        '&.Mui-selected .MuiListItemIcon-root': {
          color: themeName === 'dark' ? 'red' : (match && themeName === 'light') ? '#000': '#333',
        },
        '& .MuiListItemIcon-root': {
          color: (!match && themeName === 'light') ? '#333' : '#fff',
        },
      }}
    >
      <ListItemIcon>
        <Icon sx={{ 
          paddingRight: '1px', 
        }}>
          {icon}
        </Icon>
      </ListItemIcon>
      <ListItemText 
        primary={label}
        sx={{
          '& .MuiListItemText-primary': {
            color: (match && themeName === 'dark') ? 'red' : (!match && themeName === 'dark') ? '#fff': (match && themeName === 'light') ? '#000' : '#333',
          },
        }}
      />
    </ListItemButton>
  );
};

export default ListIItemLink;