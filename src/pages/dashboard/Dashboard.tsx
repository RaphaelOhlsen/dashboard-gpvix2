import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import DetailTools from '../../shared/components/DetailTools';
import DefaultLayoutPage from '../../shared/layouts/BasePageLayout';

import { useNotify } from '../../shared/hooks';
import Notification from '../../shared/components/Notification';

import { PersonsService } from '../../shared/services/api/persons/PersonsService';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(true);
  const [isLoadingPersons, setIsLoadingPersons] = useState<boolean>(true);
  const [totalCountCities, setTotalCountCities] = useState<number>(0);
  const [totalCountPersons, setTotalCountPersons] = useState<number>(0);

  const { notify, setNotify } = useNotify();

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingPersons(true);
    
    CitiesService.getAll(1)
      .then((result) => {
        setIsLoadingCities(false);

        if(result instanceof Error) {
          // alert(result.message);
          setNotify({
            isOpen: true,
            message: 'Erro ao carregar cidades',
            type: 'error'
          });
        } else {
          setTotalCountCities(result.totalCount);
        }
      });

    PersonsService.getAll(1)
      .then((result) => {
        setIsLoadingPersons(false);

        if(result instanceof Error) {
          setTimeout(() => {
            setNotify({
              isOpen: true,
              message: 'Erro ao carregar pessoas',
              type: 'error'
            });
          }, 3000);
          
        } else {
          setTotalCountPersons(result.totalCount);
        }
      });
  }, []);


  return (
    <DefaultLayoutPage 
      title='Página Inicial'
      toolBar={
        <DetailTools 
          showNewButton={false} 
          showBackButton={false} 
          showSaveButton={false}
          showDeleteButton={false}
        />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de pessoas
                  </Typography>
                  <Box 
                    padding={6} 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center'
                  >
                    {!isLoadingPersons && 
                      <Typography variant='h1'>
                        {totalCountPersons}
                      </Typography>
                    }
                    {isLoadingPersons && 
                      <Typography variant='h6'>
                      Carregando...
                      </Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de cidades
                  </Typography>
                  <Box 
                    padding={6} 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center'
                  >
                    {!isLoadingCities && 
                      <Typography variant='h1'>
                        {totalCountCities}
                      </Typography>
                    }
                    {isLoadingCities && 
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    }
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

      </Box>
      <Notification 
        notify={notify}
        setNotify={setNotify}
      />
    </DefaultLayoutPage>
  );
};