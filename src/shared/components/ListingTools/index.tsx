import { FC } from 'react';
import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IListingToolsProps {
  searchText?: string;
  showFindInput?: boolean;
  onSearchTextChange?: (newText: string) => void;
  textNewButton?: string;
  showNewButton?: boolean;
  onNewButtonClick?: () => void;
}

const ListingTools: FC<IListingToolsProps> = ({
  searchText = '',
  showFindInput = false,
  onSearchTextChange,
  onNewButtonClick,
  textNewButton: textOfnewButton = 'Novo',
  showNewButton = true,
}) => {
  const theme = useTheme();
  return (
    <Box 
      gap={1}
      mx={1}
      py={4}
      px={2}   
      display='flex'
      alignItems='center' 
      height={theme.spacing(5)} 
      component={Paper}
    >
      {showFindInput && (
        <TextField 
          size='small'
          value={searchText}
          placeholder= {Environment.SEARCH_INPUT_PLACEHOLDER}
          onChange={e => onSearchTextChange?.(e.target.value)}
        />
      )}
      
      <Box flex={1} display='flex' justifyContent='end'>
        {showNewButton && (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={onNewButtonClick}
          >
            {textOfnewButton}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ListingTools;