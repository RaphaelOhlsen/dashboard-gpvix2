
import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSaveAndBack = useRef(false);
  const isSaveAndNew = useRef(false);

  const handleSave = useCallback(() => {
    isSaveAndBack.current = false;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSaveAndBack.current = false;
    isSaveAndNew.current = true;
    formRef.current?.submitForm();
  },[]);

  const handleSaveAndBack = useCallback(() => {
    isSaveAndBack.current = true;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndBack = useCallback(() => {
    return isSaveAndBack.current;
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSaveAndNew.current;
  }, []);

  return { 
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndBack: handleSaveAndBack,

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndBack: handleIsSaveAndBack,
  };
};
