import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard, 
  PersonList, 
  PersonDetail, 
  CitiesList, 
  CitiesDetail,
  UsersList,
  UsersDetail,
} from '../pages';
import { useDrawerContext } from '../shared/contexts';
import { RequireAuth } from './RequiredAuth';

const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página inicial',
        allowedRoles: ['user', 'admin', 'sadmin'],
      },
      {
        icon: 'supervised_user_circle',
        path: '/users',
        label: 'Usuários',
        allowedRoles: ['user', 'admin', 'sadmin'],
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cidades',
        allowedRoles: ['user','admin', 'sadmin'],
      },
      {
        icon: 'people',
        path: '/persons',
        label: 'Pessoas',
        allowedRoles: ['user', 'admin', 'sadmin'],
      }
    ]);
  }, []);
  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} /> 

      <Route path='/users' element={<UsersList />} />
      <Route path='/users/detail/:id' element={<UsersDetail />} />

      <Route element={<RequireAuth allowedRoles={['admin', 'sadmin']} />}>
        <Route path='/persons' element={<PersonList />} /> 
      </Route>

      <Route path='/persons/detail/:id' element={<PersonDetail />} /> 

      <Route path='/cities' element={<CitiesList />} /> 
      <Route path='/cities/detail/:id' element={<CitiesDetail />} /> 

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};

export default AppRoutes;