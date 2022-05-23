import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput, UseInputProps } from '../../utility/customHooks';
import authAPI from '../../apis/authAPI';
import validator from '../../utility/validators';
import styles from './LoginForm.module.css';
import { Button, TextField, Typography } from '@mui/material';

interface LoginFormProps {
  isOn: boolean;
  handleModeSwap: () => void;
}

function LoginForm({ isOn, handleModeSwap }: LoginFormProps) {
  const navigate = useNavigate();
  const email: UseInputProps = useInput('', validator.email);
  const password: UseInputProps = useInput('', (value) => value.length > 0);
  const [error, setError] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.isValid || !password.isValid) return;

    try {
      const { data } = await authAPI.post('/login', {
        email: email.value,
        password: password.value,
      });

      // Store auth info in the session storage
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('name', `${data.firstName} ${data.lastName}`);
      sessionStorage.setItem('token', data.token);
      navigate('/home/timesheet');
      //
    } catch (e: any) {
      if (e.response?.status === 400) {
        setError(e.response.data.error);
      } else {
        setError(e.toString());
      }
      password.initValue();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${isOn && styles.isOn}`}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Login
      </Typography>
      <TextField
        {...email}
        error={email.value.length > 0 && !email.isValid}
        name="email"
        variant="outlined"
        label="Email"
        required
        fullWidth
        sx={{ marginTop: '2rem' }}
      />
      <TextField
        {...password}
        name="password"
        type="password"
        variant="outlined"
        label="Password"
        required
        fullWidth
        sx={{ marginTop: '1rem' }}
      />
      <Typography variant="body1" sx={{ color: 'red', marginTop: '1rem' }}>
        {error.length > 0 && error}
      </Typography>

      <Button
        type="submit"
        disabled={!email.isValid || !password.isValid}
        variant="contained"
        size="large"
        fullWidth
        sx={{ height: '3.5rem', marginTop: '1.5rem' }}
      >
        Login
      </Button>
      <Button
        variant="text"
        onClick={handleModeSwap}
        size="small"
        sx={{ marginTop: '1rem', opacity: '0.6', textTransform: 'none' }}
      >
        New Employee?
      </Button>
    </form>
  );
}

export default LoginForm;
