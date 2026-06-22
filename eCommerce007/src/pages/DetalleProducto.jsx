import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { useCart } from '../contexts/CartContext';
import { 
  Grid, Typography, Button, Box, CircularProgress, 
  Alert, Breadcrumbs, Link as MuiLink, Paper 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function DetalleProducto() {
  // 1. Capturamos el ID dinámico de la URL mediante React Router DOM
  const { id } = useParams();
  
  // 2. Traemos el contexto global del carrito de compras
  const { agregarProducto } = useCart();

  // 3. Consumimos el Custom Hook obligatorio pasándole el ID
  const { product: producto, loading, error } = useProductDetail(id);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        No pudimos cargar la ficha técnica del artículo. Detalle: {error}
      </Alert>
    );
  }

  // Sanitizado de la URL por fallas nativas de strings en la API de Platzi
  const urlImagen = producto?.images && producto.images[0]
    ? producto.images[0].replace(/[\[\]"]/g, "") 
    : 'https://placeholder.com';

  return (
    <Box>
      {/* Sistema de migas de pan para navegación amigable */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <MuiLink component={Link} underline="hover" color="inherit" to="/">
          Inicio
        </MuiLink>
        <MuiLink component={Link} underline="hover" color="inherit" to="/productos">
          Productos
        </MuiLink>
        <Typography color="text.primary">{producto?.title}</Typography>
      </Breadcrumbs>

      <Button 
        component={Link} 
        to="/productos" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4 }}
      >
        Volver al catálogo completo
      </Button>

      {/* Grilla responsiva sin el atributo "item" plano para limpiar la consola */}
      <Grid container spacing={4}>
        
        {/* Columna Izquierda: Imagen de portada */}
        <Grid xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: 'white' }}>
            <Box
              component="img"
              src={urlImagen}
              alt={producto?.title}
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 1
              }}
            />
          </Paper>
        </Grid>

        {/* Columna Derecha: Precios y Acciones */}
        <Grid xs={12} md={6} sx={{ pl: { md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" color="secondary.main" fontWeight="bold" sx={{ textTransform: 'uppercase', mb: 1 }}>
              Categoría: {producto?.category?.name || 'General'}
            </Typography>

            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              {producto?.title}
            </Typography>

            <Typography variant="h5" color="primary.main" fontWeight="bold" sx={{ my: 2 }}>
              ${producto?.price?.toLocaleString('es-AR')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
              {producto?.description}
            </Typography>
          </Box>

          {/* Botón funcional conectado al Context de compras */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={() => {
                agregarProducto(producto);
                alert(`¡Se añadió "${producto?.title}" al carrito de compras!`);
              }}
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
