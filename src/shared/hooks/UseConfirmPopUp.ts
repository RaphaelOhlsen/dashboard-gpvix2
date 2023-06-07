/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { IConfirmPopUp } from '../components/PopUp/ConfirmPopUp';

interface IusePopUp {
  confirmPopUp: IConfirmPopUp;
  setConfirmPopUp: (newNotify: IConfirmPopUp) => void;
}

export const useConfirmPopUp = (): IusePopUp => {
  const [confirmPopUp, setConfirmPopUp] = useState<IConfirmPopUp>({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const handleSetNotify = (newConfirmPopUp: IConfirmPopUp) => {
    setConfirmPopUp({ ...confirmPopUp, ...newConfirmPopUp });
  };

  return { confirmPopUp, setConfirmPopUp: handleSetNotify };
};
