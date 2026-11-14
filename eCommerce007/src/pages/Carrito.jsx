import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Typography, Box, Grid, Card, Button, IconButton, Divider, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function Carrito() {
  const { carrito, eliminarProducto, vaciarCarrito, total, cantidadTotal } = useCart();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const handlePagar = () => {
    setCompraExitosa(true);
  };

  const handleCerrarModal = () => {
    setCompraExitosa(false);
    vaciarCarrito();
  };

  if (carrito.length === 0 && !compraExitosa) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" gutterBottom>Tu carrito está vacío</Typography>
        <Button component={Link} to="/productos" variant="contained" sx={{ mt: 2 }}>
          Ir al catálogo
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tu Carrito ({cantidadTotal})
      </Typography>

      {/* Sintaxis correcta de Grid para MUI v9 */}
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          {carrito.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ width: '40%' }}>
                {item.title}
              </Typography>
              <Typography variant="body2">Cant: {item.cantidad}</Typography>
              <Typography variant="body2" fontWeight="bold">
                ${(item.price * item.cantidad).toLocaleString('es-AR')}
              </Typography>
              <IconButton color="error" onClick={() => eliminarProducto(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
          <Button variant="outlined" color="error" onClick={vaciarCarrito} startIcon={<DeleteIcon />} sx={{ mt: 2 }}>
            Vaciar carrito
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold">Resumen</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total:</Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                ${total.toLocaleString('es-AR')}
              </Typography>
            </Box>
            <Button 
              type="button"
              variant="contained" 
              fullWidth 
              onClick={handlePagar}
            >
              Pagar
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Ventana de confirmación de compra */}
      <Dialog open={compraExitosa} onClose={handleCerrarModal}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon color="success" />
          ¡Compra procesada!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Tu pedido por un total de <strong>${total.toLocaleString('es-AR')}</strong> fue confirmado con éxito.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarModal} variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
