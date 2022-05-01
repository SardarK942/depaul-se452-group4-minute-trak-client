import styles from './RegisterForm.module.css';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useInput } from '../../utility/customHooks';

interface RegisterFormProps {
  isOn: boolean;
  handleModeSwap: () => void;
}

function RegisterForm({ isOn, handleModeSwap }: RegisterFormProps) {
  const email = useInput('', () => true);
  const password = useInput('', () => true);
  const passwordCheck = useInput('', () => true);
  const firstName = useInput('', () => true);
  const lastName = useInput('', () => true);
  const phone = useInput('', () => true);
  const dob = useInput('2022-01-01', () => true);
  const address = useInput('', () => true);

  return (
    <form className={`${styles.form} ${isOn && styles.isOn}`}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Register
      </Typography>
      <TextField {...email} variant="outlined" label="Email" required fullWidth sx={{ marginTop: '2rem' }} />

      <Grid container spacing={1} sx={{ marginTop: '0.5rem' }}>
        <Grid item xs={12} sm={6}>
          <TextField {...password} variant="outlined" label="Password" type="password" required fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...passwordCheck}
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

      <Button
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
        sx={{ height: '3.5rem', marginTop: '2.5rem' }}
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
