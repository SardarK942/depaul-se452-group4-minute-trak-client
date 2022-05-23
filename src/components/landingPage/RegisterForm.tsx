import styles from './RegisterForm.module.css';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useInput, UseInputProps } from '../../utility/customHooks';
import authAPI from '../../apis/authAPI';
import validator from '../../utility/validators';
import { useState } from 'react';

interface RegisterFormProps {
  isOn: boolean;
  handleModeSwap: () => void;
}

function RegisterForm({ isOn, handleModeSwap }: RegisterFormProps) {
  const email: UseInputProps = useInput('', validator.email);
  const password: UseInputProps = useInput('', validator.password);
  const passwordCheck: UseInputProps = useInput('', (v) => v === password.value);
  const firstName: UseInputProps = useInput('', (v) => v.length > 0);
  const lastName: UseInputProps = useInput('', (v) => v.length > 0);
  const phone: UseInputProps = useInput('', (v) => v.length > 0);
  const dob: UseInputProps = useInput('2022-01-01', () => true);
  const address: UseInputProps = useInput('', (v) => v.length > 0);
  const [error, setError] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    authAPI
      .post('/signup', {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        dob: dob.value,
        phone: phone.value,
        address: address.value,
      })
      .then(() => alert(`The sign-up request has been submitted.\nYour account is pending review.`))
      .then(() => handleModeSwap())
      .catch((e: any) => {
        if (e.response?.status === 400) {
          setError(e.response.data.error);
        } else {
          setError(e.toString());
        }
      });
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${isOn && styles.isOn}`}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Register
      </Typography>
      <TextField
        {...email}
        error={email.value.length > 0 && !email.isValid}
        variant="outlined"
        label="Email"
        required
        fullWidth
        sx={{ marginTop: '2rem' }}
      />

      <Grid container spacing={1} sx={{ marginTop: '0.5rem' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...password}
            helperText="at least 8 characters"
            error={password.value.length > 0 && !password.isValid}
            variant="outlined"
            label="Password"
            type="password"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...passwordCheck}
            error={passwordCheck.value.length > 0 && !passwordCheck.isValid}
            variant="outlined"
            label="Confirm Password"
            type="password"
            required
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ marginTop: '2rem' }}>
        <Grid item xs={12} sm={6}>
          <TextField {...firstName} variant="outlined" label="First Name" required fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField {...lastName} variant="outlined" label="Last Name" required fullWidth />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ marginTop: '0.5rem' }}>
        <Grid item xs={12} sm={6}>
          <TextField {...phone} variant="outlined" label="Phone" required fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField {...dob} variant="outlined" label="Date of Birth" type="date" required fullWidth />
        </Grid>
      </Grid>

      <TextField {...address} variant="outlined" label="Address" fullWidth required sx={{ marginTop: '1rem' }} />

      <Typography variant="body1" sx={{ color: 'red', marginTop: '1rem' }}>
        {error.length > 0 && error}
      </Typography>

      <Button
        type="submit"
        disabled={
          !email.isValid ||
          !password.isValid ||
          !passwordCheck.isValid ||
          !firstName.value ||
          !lastName.value ||
          !phone.value ||
          !dob.value ||
          !address.value
        }
        variant="contained"
        size="large"
        fullWidth
        sx={{ height: '3.5rem', marginTop: '1rem' }}
      >
        Register
      </Button>

      <Button
        variant="text"
        onClick={handleModeSwap}
        size="small"
        sx={{ marginTop: '1rem', opacity: '0.6', textTransform: 'none' }}
      >
        Already have an account?
      </Button>
    </form>
  );
}

export default RegisterForm;
