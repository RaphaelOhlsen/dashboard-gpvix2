import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

export interface IConfirmPopUp {
  isOpen: boolean;
  title: string;
  subTitle: string;
}

interface IPopUpProps {
  confirmPopUp: IConfirmPopUp;
  setConfirmPopUp: (value: IConfirmPopUp) => void;
  onConfirm: () => void;
}
const ConfirmPopUp: FC<IPopUpProps> = ({ confirmPopUp, setConfirmPopUp, onConfirm}) => {

  return (
    <Dialog
      open={confirmPopUp.isOpen}
      onClose={() => setConfirmPopUp({ ...confirmPopUp, isOpen: false })}
    >
      <DialogTitle sx={{ textAlign: 'center', }}
      >
        <IconButton
          disableRipple
          sx={{ 
            color: '#f00',
            backgroundColor: '#fcc',
            '& .MuiSvgIcon-root': { 
              fontSize: '6rem',
            },
            '&:hover': {
              cursor: 'default'
            },
          }}
        >
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{textAlign: 'center'}}>
        <Typography variant='h6' sx={{cursor: 'default'}}>
          { confirmPopUp.title }
        </Typography>
        <Typography variant='subtitle2' sx={{cursor: 'default'}}>
          { confirmPopUp.subTitle }
        </Typography>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center', gap: '10px'}}>
        <Button 
          variant='contained'
          disableElevation 
          onClick={() => setConfirmPopUp({ ...confirmPopUp, isOpen: false })}
          sx={{
            backgroundColor: 'gray',
            color: 'white',
            '&:hover': {
              backgroundColor: '#404040',
            }
          }}
        >
          Fechar
        </Button>
        <Button 
          variant='contained' 
          disableElevation 
          onClick={onConfirm}
          color='error'
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default ConfirmPopUp;