import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';

export function Registro() {
  const { registro } = useUser();
  const navigate = useNavigate();
  // useState obligatorio para formularios
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre.trim() || !emailValido.test(email) || password !== confirmar || password.length < 6) {
      setError('Verifica los datos y que las contraseñas coincidan(6 carácteres mínimo).');
      return;
    }
    // Llama al método del contexto obligatorio
    registro({ nombre, email, password });
    setExito(true);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>Registro</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {exito && <Alert severity="success" sx={{ mb: 2 }}>¡Registrado con éxito!</Alert>}
        <Box component="form" onSubmit={manejarEnvio}>
          <TextField margin="normal" fullWidth label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <TextField margin="normal" fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField margin="normal" fullWidth label="Confirmar Password" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3 }}>Registrarse</Button>
        </Box>
      </Paper>
    </Container>
  );
}
