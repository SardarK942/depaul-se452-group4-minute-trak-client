import styles from './LoginForm.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useInput } from '../../utility/customHooks';

interface LoginFormProps {
  isOn: boolean;
  handleModeSwap: () => void;
}

function LoginForm({ isOn, handleModeSwap }: LoginFormProps) {
  const email = useInput('', () => true);
  const loginPassword = useInput('', () => true);

  return (
    <form className={`${styles.form} ${isOn && styles.isOn}`}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Login
      </Typography>
      <TextField {...email} variant="outlined" label="Email" required fullWidth sx={{ marginTop: '2rem' }} />
      <TextField {...loginPassword} variant="outlined" label="Password" required fullWidth sx={{ marginTop: '1rem' }} />

      <Button
        disabled={!email.isValid || !loginPassword.isValid}
        variant="contained"
        size="large"
        fullWidth
        sx={{ height: '3.5rem', marginTop: '2.5rem' }}
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
