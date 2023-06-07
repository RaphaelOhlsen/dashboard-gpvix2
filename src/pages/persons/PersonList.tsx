/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useEffect, useMemo, useState } from 'react';
import { 
  Icon, 
  IconButton, 
  LinearProgress, 
  Pagination, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IPersonList, PersonsService } from 
  '../../shared/services/api/persons/PersonsService';

import ConfirmPopUp from '../../shared/components/PopUp/ConfirmPopUp';
import BasePageLayout from '../../shared/layouts/BasePageLayout';
import ListingTools from '../../shared/components/ListingTools';
import Notification from '../../shared/components/Notification';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';

import {useNotify} from '../../shared/hooks';
import { useConfirmPopUp } from '../../shared/hooks';

export const PersonList: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const { notify, setNotify } = useNotify();
  const { confirmPopUp, setConfirmPopUp } = useConfirmPopUp();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IPersonList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(10);
  const [deleteId, setDeleteId] = useState<number>(0);

  const handlePopup = (id: number): void => {
    setDeleteId(id);
    setConfirmPopUp({
      isOpen: true,
      title: 'Tem certeza que deseja excluir o registro?',
      subTitle: 'Você não poderá desfazer esta ação.'
    });
  };

  const rowsPerQuery = useMemo(() => {
    return window.innerHeight <= 663 ? 7 : 13;
  }, []);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PersonsService.getAll(page, search, rowsPerQuery)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            // alert(result.message);
            setNotify({
              isOpen: true,
              message: 'Erro de conexão',
              type: 'error'
            });
          } else {
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  }, [search, page]);

  const handleDelete = () => {
    
    PersonsService.deleteById(deleteId)
      .then(result => {
        if(result instanceof Error) {
          setConfirmPopUp({ ...confirmPopUp, isOpen: false });
          setNotify({
            isOpen: true,
            message: 'Erro ao deletar',
            type: 'error'
          });
        } else {
          setRows(oldRows => [             
            ...oldRows.filter(oldRow => oldRow.id !== deleteId)
          ]);
          setConfirmPopUp({ ...confirmPopUp, isOpen: false });
          setNotify({ 
            isOpen: true, 
            message: 'Deletado com sucesso', 
            type: 'success' 
          });
        }
      });
    
  };

  return (
    <BasePageLayout 
      title='Listagem de pessoas'
      toolBar={
        <ListingTools 
          showFindInput 
          textNewButton='Nova'
          searchText={search}
          onNewButtonClick={() => navigate('/persons/detail/new')}
          onSearchTextChange={text => 
            setSearchParams({search: text, page:'1'}, { replace: true })
          }
        />
      }
    >
      <TableContainer 
        component={Paper} 
        variant='outlined'
        sx={{ m: 1, width: 'auto' }}
      >
        <Table 
          sx={{ 
            '.MuiTableCell-root': { py: '5px'},
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell width={150}>Ações</TableCell>
              <TableCell>Mome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handlePopup(row.id)}>
                    <Icon >delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/persons/detail/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {(totalCount === 0 && !isLoading) && (
            <caption>{Environment.EMPTY_LIST_MESSAGE}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
           
            {totalCount > 0 && totalCount > rowsPerQuery && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={page}
                    count={Math.ceil(totalCount / rowsPerQuery)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmPopUp 
        confirmPopUp={confirmPopUp}
        setConfirmPopUp={setConfirmPopUp}
        onConfirm={handleDelete}
      />
      <Notification 
        notify={notify}
        setNotify={setNotify}
      />
    </BasePageLayout>
  );
};