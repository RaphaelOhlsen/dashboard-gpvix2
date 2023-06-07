import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import './shared/forms/YupTranslations';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import AppRoutes from './routes';

import MainLayout from './shared/layouts/MainLayout';
import Login from './shared/components/Login';



const App = () =>{
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <CssBaseline />
              <MainLayout>
                <AppRoutes />
              </MainLayout>

            </BrowserRouter>
          </DrawerProvider>
        
        </Login>

      </AppThemeProvider>
    </AuthProvider>
   
  );
};

export default App;