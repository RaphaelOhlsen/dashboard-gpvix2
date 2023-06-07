/* eslint-disable prefer-const */
import { FC } from 'react';
import { Snackbar, Alert } from '@mui/material';

export interface INotify {
  isOpen: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

interface INotificationProps {
  notify: INotify;
  setNotify: (value: INotify) => void;
}

const Notification: FC<INotificationProps> = ({ notify, setNotify }) => {

  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
      sx={{ marginTop: '56px' }}
    >
      <Alert
        onClose={handleClose}
        severity={
          notify.type === 'error' ? 'error' : 
            notify.type === 'warning' ? 'warning' :
              notify.type === 'info' ? 'info' : 'success'}
      >
        {notify.message}
      </Alert>
    </Snackbar> 
    
    
  );
};

export default Notification;
