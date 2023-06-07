import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';

import { PersonsService } from '../../shared/services/api/persons/PersonsService';
import ConfirmPopUp from '../../shared/components/PopUp/ConfirmPopUp';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import BasePageLayout from '../../shared/layouts/BasePageLayout';
import Notification from '../../shared/components/Notification';
import DetailTools from '../../shared/components/DetailTools';

import { useConfirmPopUp } from '../../shared/hooks';
import { useNotify } from '../../shared/hooks';
import { CityAutoComplete } from './components/CityAutoComplete';

interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  cityId: yup.number().required(),
});

export const PersonDetail: FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [deleteId, setDeleteId] = useState<number>(0);
  const { notify, setNotify } = useNotify();
  const { confirmPopUp, setConfirmPopUp } = useConfirmPopUp();

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);
      PersonsService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/persons');
        } else {
          setName(result.fullName);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        fullName: '',
        email: '',
        cityId: undefined,
      });
    }
  }, [id]);

  const handlePopup = (id: number): void => {
    setDeleteId(id);
    setConfirmPopUp({
      isOpen: true,
      title: 'Tem certeza que deseja excluir o registro?',
      subTitle: 'Você não poderá desfazer esta ação.',
    });
  };

  const handleDelete = () => {
    PersonsService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        setConfirmPopUp({ ...confirmPopUp, isOpen: false });
        setNotify({
          isOpen: true,
          message: 'Erro ao deletar',
          type: 'error',
        });
        setTimeout(() => {
          navigate('/persons');
        }, 3000);
      } else {
        setConfirmPopUp({
          ...confirmPopUp,
          isOpen: false,
        });
        setNotify({
          isOpen: true,
          message: 'Registro apagado com sucesso!!',
          type: 'success',
        });
        setTimeout(() => {
          navigate('/persons');
        }, 3000);
      }
    });
  };

  const handleSave = async (data: IFormData) => {
    formValidationSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          PersonsService.create(validateData)
            .then(result => {
              setIsLoading(false);
              console.log('result no controler', result);
              if (result instanceof Error) {
                setNotify({
                  isOpen: true,
                  message: 'Erro ao cadastrar',
                  type: 'error'
                });
              } else {
                setNotify({
                  isOpen: true,
                  message: 'Cadastro realizado com sucesso!',
                  type: 'success'
                });
                if (isSaveAndBack()) {
                  setTimeout(() => {
                    navigate('/persons');
                  }, 3000);
                } else {
                  navigate(`/persons/detail/${result}`);
                }
              }
            });
        } else {
          PersonsService.updateById(Number(id), { id: Number(id) , ...validateData })
            .then(result => {
              setIsLoading(false);
              setNotify({
                isOpen: true,
                message: 'Cadastro atualizado com sucesso!',
                type: 'success'
              });
              if (result instanceof Error) {
                setNotify({
                  isOpen: true,
                  message: 'Erro ao atualizar',
                  type: 'error',
                });
              } else {
                isSaveAndBack() && setTimeout(() => {
                  navigate('/persons');
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
        }
        );
        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <BasePageLayout
      title={id === 'new' ? 'Nova Pessoa' : name}
      toolBar={
        <DetailTools
          textNewButton='Nova Pessoa'
          showSaveAndBackButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSaveButton={save}
          onClickSaveAndBackButton={saveAndBack}
          onClickDeleteButton={() => handlePopup(Number(id))}
          onClickBackButton={() => navigate('/persons')}
          onClickNewButton={() => navigate('/persons/detail/new')}
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
              <Typography variant='h6'>Gerall</Typography>
            </Grid>

            <Grid container item direction='row' gap={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome completo'
                  name='fullName'
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
                <CityAutoComplete isExternalLoading={isLoading} />
                {/* <VTextField 
                  fullWidth
                  label='Cidade' 
                  name='cityId'
                  disabled={isLoading}
                /> */}
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
