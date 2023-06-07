import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';

import { UsersService } from '../../shared/services/api/users/UsersService';
import ConfirmPopUp from '../../shared/components/PopUp/ConfirmPopUp';
import {
  VTextField,
  VForm,
  useVForm,
  IVFormErrors,
  VSelect,
} from '../../shared/forms';
import BasePageLayout from '../../shared/layouts/BasePageLayout';
import Notification from '../../shared/components/Notification';
import DetailTools from '../../shared/components/DetailTools';

import { useConfirmPopUp } from '../../shared/hooks';
import { useNotify } from '../../shared/hooks';

interface IFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  role: yup.string().required(),
});

export const UsersDetail: FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [deleteId, setDeleteId] = useState<number>(0);
  const { notify, setNotify } = useNotify();
  const { confirmPopUp, setConfirmPopUp } = useConfirmPopUp();

  const selectOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Administrator' },
    { value: 'sadmin', label: 'Super Administrator' },
  ];

  const handlePopup = (id: number): void => {
    setDeleteId(id);
    setConfirmPopUp({
      isOpen: true,
      title: 'Tem certeza que deseja excluir o registro?',
      subTitle: 'Você não poderá desfazer esta ação.',
    });
  };

  const handleDelete = () => {
    UsersService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        setConfirmPopUp({ ...confirmPopUp, isOpen: false });
        setNotify({
          isOpen: true,
          message: 'Erro ao deletar',
          type: 'error',
        });
        setTimeout(() => {
          navigate('/users');
        }, 3000);
      } else {
        setConfirmPopUp({
          ...confirmPopUp,
          isOpen: false,
        });
        setNotify({
          isOpen: true,
          message: 'Registro apagado com sucesso!',
          type: 'success',
        });
        setTimeout(() => {
          navigate('/users');
        }, 3000);
      }
    });
  };

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          UsersService.create(validateData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              setNotify({
                isOpen: true,
                message: 'Erro ao cadastrar',
                type: 'error',
              });
            } else {
              setNotify({
                isOpen: true,
                message: 'Cadastro realizado com sucesso!',
                type: 'success',
              });
              if (isSaveAndBack()) {
                setTimeout(() => {
                  navigate('/users');
                }, 3000);
                return;
              }
              navigate(`/users/detail/${result}`);
            }
          });
        } else {
          UsersService.updateById(Number(id), {
            id: Number(id),
            ...validateData,
          }).then((result) => {
            setIsLoading(false);
            setNotify({
              isOpen: true,
              message: 'Cadastro atualizado com sucesso!',
              type: 'success',
            });
            if (result instanceof Error) {
              setNotify({
                isOpen: true,
                message: 'Erro ao atualizar',
                type: 'error',
              });
            } else {
              isSaveAndBack() &&
                setTimeout(() => {
                  navigate('/users');
                }, 3000);
            }
          });
        }
      })
      .catch((error: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        error.inner.forEach((err) => {
          if (!err.path) return;
          validationErrors[err.path] = err.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

 
  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      UsersService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/users');
        } else {
          setName(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: '',
        email: '',
        role: '',
      });
    }
  }, [id]);

  return (
    <BasePageLayout
      title={id === 'new' ? 'Novo Usuário' : name}
      toolBar={
        <DetailTools
          textNewButton='Nova Usuário'
          showSaveAndBackButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSaveButton={save}
          onClickSaveAndBackButton={saveAndBack}
          onClickDeleteButton={() => handlePopup(Number(id))}
          onClickBackButton={() => navigate('/users')}
          onClickNewButton={() => navigate('/users/detail/new')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          m={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid container direction='column' p={2} gap={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' hidden={!isLoading} />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' gap={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome'
                  name='name'
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' gap={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Email'
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' gap={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Senha'
                  name='password'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' gap={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VSelect
                  name='role'
                  label='Role'
                  options={selectOptions}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
      <ConfirmPopUp
        confirmPopUp={confirmPopUp}
        setConfirmPopUp={setConfirmPopUp}
        onConfirm={handleDelete}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </BasePageLayout>
  );
};
