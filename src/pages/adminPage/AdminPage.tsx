import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useInput, UseInputProps } from '../../utility/customHooks';
import  NavbarAdmin from '../../components/common/navbar/NavbarAdmin';
import { ReactFragment } from 'react';
import adminAPI from '../../apis/adminAPI';
import styles from './AdminLoginForm.module.css';
import validator from '../../utility/validators';





function AdminPage() {
  const email: UseInputProps = useInput('', validator.email);
  const password: UseInputProps = useInput('', (value) => value.length > 0);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');



  async function handleClickLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    if(!email.isValid || !password.isValid) return;

    try {
      const { data } = await adminAPI.post('/login', {
        email: email.value,
        password: password.value,
      });

      // Store auth info in the session storage
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('token', data.token);
      navigate('/home/admin');
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
    <Box sx={{ position: 'relative', width: '100%', maxWidth: '40rem', margin: 'auto', marginTop: '15%' }}>
          <form onSubmit={handleClickLogin} className={`${styles.form} ${styles.isOn}`}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Admin
      </Typography>
      <TextField {...email} variant="outlined" label="Admin Email" required fullWidth sx={{ marginTop: '2rem' }} />
      <TextField {...password} variant="outlined" label="Password" type="password" required fullWidth sx={{ marginTop: '1rem' }} />

      <Button
        type="submit"
        disabled={!email.value || !password.value}
        variant="contained"
        size="large"
        fullWidth
        sx={{ height: '3.5rem', marginTop: '2.5rem' }}
      >
        Login
      </Button>
      </form>
    </Box>
  );
}

export default AdminPage;
