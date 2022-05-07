import { Box, Button, TextField, Typography } from '@mui/material';
import { useInput } from '../../utility/customHooks';

function AdminPage() {
  const account = useInput('');
  const password = useInput('');

  async function handleClickLogin() {}

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: '40rem', margin: 'auto', marginTop: '15%' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Admin
      </Typography>
      <TextField {...account} variant="outlined" label="Admin Account" required fullWidth sx={{ marginTop: '2rem' }} />
      <TextField {...password} variant="outlined" label="Password" required fullWidth sx={{ marginTop: '1rem' }} />

      <Button
        disabled={!account.value || !password.value}
        variant="contained"
        size="large"
        fullWidth
        sx={{ height: '3.5rem', marginTop: '2.5rem' }}
        onClick={handleClickLogin}
      >
        Login
      </Button>
    </Box>
  );
}

export default AdminPage;
