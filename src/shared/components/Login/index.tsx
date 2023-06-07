import { FC, ReactNode, useState } from 'react';
import { 
  InputAdornment, 
  OutlinedInput, 
  CardActions, 
  CardContent, 
  FormControl,  
  IconButton, 
  InputLabel, 
  Typography, 
  TextField, 
  useTheme, 
  Button, 
  Box, 
  Card,
  FormHelperText,
  CircularProgress,
  LinearProgress, 
} from '@mui/material';

import * as yup from 'yup';

import { useAuthContext } from '../../contexts';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface ILoginProps {
  children: ReactNode;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

export const Login: FC<ILoginProps> = ({children}) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email,password}, { abortEarly: false })
      .then((validateData) => {
        login(validateData.email, validateData.password).
          then(() => {
            setIsLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
    setEmailError('');
    setPasswordError('');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const theme = useTheme();


  if (isAuthenticated) return (
    <>{children}</>
  );

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        backgroundColor: theme.palette.background.paper
      }}

   
    >
      <Card>
        {isLoading && <LinearProgress variant='indeterminate'/>}
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={300}>
            <Typography 
              variant='h6'
              textAlign='center'
            >
              Identifique-se
            </Typography>

            <TextField 
              value={email}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError('')}
              disabled={isLoading}
              label='Email'
              type='email'
              fullWidth
            />

            <FormControl variant="outlined">
              <InputLabel htmlFor="adornment">
                Senha
              </InputLabel>
              <OutlinedInput
                id="adornment"
                type={showPassword ? 'text' : 'password'}
                value={password}
                error={!!passwordError}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={() => setPasswordError('')}
                disabled={isLoading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {!!passwordError && (
                <FormHelperText error>
                  {passwordError}
                </FormHelperText>
              )}
            </FormControl>
            
            {/* <TextField 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='Senha'
              type='password'
              fullWidth
            /> */}
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={isLoading}
              endIcon={
                isLoading ? 
                  <CircularProgress 
                    variant='indeterminate' 
                    color='inherit'  
                    size={20} 
                  /> : undefined}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;