import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Container, Paper, Stack, Typography, Button, Alert } from '@mui/material';

export function Perfil() {
  // useState vinculados directamente a los contextos solicitados
  const { usuario, logout } = useUser();
  const { cantidadTotal } = useCart();

  if (!usuario) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Acceso Restringido</Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>Debes iniciar sesión para visualizar los datos.</Typography>
          <Button component={Link} to="/login" variant="contained" fullWidth>Ir a Iniciar Sesión</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" align="center" mb={3}>Perfil de Usuario</Typography>
        
        <Stack spacing={2} sx={{ my: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
            Nombre: {usuario.nombre}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
            Email: {usuario.email}
          </Typography>
        </Stack>
        
        <Alert severity="info" sx={{ mb: 4 }}>
          Productos en carrito: <strong>{cantidadTotal}</strong>
        </Alert>
        <Button variant="contained" color="error" fullWidth onClick={logout}>Cerrar Sesión</Button>
      </Paper>
    </Container>
  );
}
