/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { INotify } from '../components/Notification';

interface IUseNotify {
  notify: INotify;
  setNotify: (newNotify: INotify) => void;
}

export const useNotify = (): IUseNotify => {
  const [notify, setNotify] = useState<INotify>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const handleSetNotify = (newNotify: INotify) => {
    setNotify({ ...notify, ...newNotify });
  };

  return { notify, setNotify: handleSetNotify };
};
