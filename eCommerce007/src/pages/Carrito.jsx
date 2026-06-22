import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Typography, Box, Grid, Card, Button, IconButton, Divider, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function Carrito() {
  // useState obligatorio mapeado desde el contexto global
  const { carrito, eliminarProducto, vaciarCarrito, total, cantidadTotal } = useCart();

  if (carrito.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" gutterBottom>Tu carrito está vacío</Typography>
        <Button component={Link} to="/productos" variant="contained" sx={{ mt: 2 }}>Ir al catálogo</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Tu Carrito ({cantidadTotal})</Typography>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={8}>
          {carrito.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ width: '40%' }}>{item.title}</Typography>
              <Typography variant="body2">Cant: {item.cantidad}</Typography>
              <Typography variant="body2" fontWeight="bold">${item.price * item.cantidad}</Typography>
              <IconButton color="error" onClick={() => eliminarProducto(item.id)}><DeleteIcon /></IconButton>
            </Card>
          ))}
          <Button variant="outlined" color="error" onClick={vaciarCarrito} startIcon={<DeleteIcon />} sx={{ mt: 2 }}>
            Vaciar carrito
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold">Resumen</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total:</Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">${total}</Typography>
            </Box>
            <Button variant="contained" fullWidth onClick={() => alert('¡Compra procesada!')}>Pagar</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
