import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Theme } from '@mui/system';

interface IDetailToolsProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

  onClickNewButton?: () => void;
  onClickBackButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickSaveButton?: () => void;
  onClickSaveAndBackButton?: () => void; 
}

const DetailTools: React.FC<IDetailToolsProps> = ({
  textNewButton = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

  onClickNewButton,
  onClickBackButton,
  onClickDeleteButton,
  onClickSaveButton,
  onClickSaveAndBackButton,

}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      paddingY={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(6)}
      component={Paper}
    >
      {(showSaveButton && !showSaveButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickSaveButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography       variant='button'whiteSpace='nowrap'textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && (
        <Skeleton width={110} height={60} />
      )}

      {(showSaveAndBackButton && !showSaveAndBackButtonLoading && !smDown &&    !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickSaveAndBackButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography             variant='button'whiteSpace='nowrap'textOverflow='ellipsis' overflow='hidden'>
            Salvar e voltar
          </Typography>
        </Button>
      )}
      
      {(showSaveAndBackButtonLoading && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDeleteButton}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography       variant='button'whiteSpace='nowrap'textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>    
      )}

      {showDeleteButtonLoading && (
        <Skeleton width={110} height={60} />
      )}
      
      {(showNewButton && !showNewButtonLoading && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickNewButton}
          startIcon={<Icon>add</Icon>}
        >
          <Typography       variant='button'whiteSpace='nowrap'textOverflow='ellipsis' overflow='hidden'>
            {textNewButton}
          </Typography>
        </Button>
      )}
      
      {(showNewButtonLoading && !smDown) && (
        <Skeleton width={110} height={60} />
      )}

      {
        (
          showBackButton && 
          (showNewButton || showDeleteButton || showSaveButton || showSaveAndBackButton) && (
            <Divider variant='middle' orientation='vertical' />
          )
        )
      }
      

      {(showBackButton && !showBackButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickBackButton}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography     variant='button'whiteSpace='nowrap'textOverflow='ellipsis' overflow='hidden'>
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && (
        <Skeleton width={110} height={60} />
      )}
      
    </Box>
  );};

export default DetailTools;