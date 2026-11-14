import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';

export function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  // useState obligatorio para formularios
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    // este array contiene los caracteres que no son válidos en un correo electrónico
    //dentro aparece el @ porque es obligatorio en un correo electrónico, y el . porque es necesario para el dominio
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      setError('Ingresa un correo válido con dominio (.com, .es ...) y una contraseña de al menos 6 caracteres.');
      return;
    }
    if (password.length < 6) {
      setError('Credenciales inválidas (Mínimo 6 caracteres en contraseña).');
      return;
    }
    const resultado = login(email, password);
    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }
    navigate('/perfil');
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>Iniciar Sesión</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={manejarEnvio}>
          <TextField margin="normal" fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Ingresar</Button>
        </Box>
      </Paper>
    </Container>
  );
}
