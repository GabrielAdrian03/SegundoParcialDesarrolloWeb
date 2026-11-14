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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
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
      <Grid container spacing={4} alignItems="center">
        
        {/* imagen */}
        {/* el size sirve para definir el ancho en diferentes breakpoints
        y el md sirve para definir el ancho en el breakpoint md */}
        <Grid size={{ xs:12, md:5 }}>
          <Paper 
          elevation={2} 
          sx={{ 
            p: 0.5, 
            height: 300,
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center', 
            bgcolor: 'white',
            borderRadius: 3,
            }}>
            <Box
              component="img"
              src={urlImagen}
              alt={producto?.title}
              sx={{
                width: '80%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 2
              }}
            />
          </Paper>
        </Grid>

        {/* Columna Derecha: Precios y Acciones */}
        <Grid 
        size={{ xs:12, md:6 }}
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Box>
            <Typography 
            variant="caption" 
            color="secondary.main" 
            fontWeight="bold" 
            sx={{ textTransform: 'uppercase', mb: 0.5, display: 'block' }}>
              Categoría: {producto?.category?.name || 'General'}
            </Typography>

            {/* Título */}
            <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
              {producto?.title}
            </Typography>

            {/* Precio */}
            <Typography variant="h6" color="primary.main" fontWeight="bold" sx={{ my: 1.5 }}>
              ${producto?.price?.toLocaleString('es-AR')}
            </Typography>

            {/* Descripción */}
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
              {producto?.description}
            </Typography>
          </Box>

          {/* Botón de compras */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={() => {
                const agregado = agregarProducto(producto);
                if (agregado) {
                  alert(`¡Se añadió "${producto?.title}" al carrito de compras!`);
                }
              }}
              sx={{ px: 4, py: 1.5, fontSize: '0.9rem', fontWeight: 'bold' }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
