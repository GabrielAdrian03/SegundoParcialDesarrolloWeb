import { useProducts } from '../hooks/useProducts';
import { ProductoCard } from '../components/ProductoCard';
import { Grid, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';

export function Home() {
  // 1. Traemos un lote inicial de productos usando el Hook obligatorio
  const { products: productos, loading, error } = useProducts(30, 0);

  // 2. Función interna para mezclar el arreglo y recortar 8 unidades aleatorias
  const obtenerProductosAleatorios = (listaProductos) => {
    if (!listaProductos) return [];
    const listaMezclada = [...listaProductos].sort(() => 0.5 - Math.random());
    return listaMezclada.slice(0, 8);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error al cargar la página de inicio: {error}</Alert>;
  }

  const productosDestacados = obtenerProductosAleatorios(productos);

  return (
    <Box>
      {/* Sección Destacada / Hero Banner */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          p: 6, 
          borderRadius: 2, 
          mb: 6,
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          ¡Bienvenidos a Compras 007!
        </Typography>
        <Typography variant="h6" paragraph>
          Descubre los mejores productos tecnológicos, ropa y accesorios a precios increíbles.
        </Typography>
      </Box>

      {/* Título de la Sección de Productos */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
        Productos Destacados
      </Typography>

      {/* Grilla corregida: Eliminamos el atributo "item" e inyectamos espaciado estándar */}
      <Grid container spacing={3}>
        {productosDestacados.map((producto) => (
          <Grid key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <Box sx={{ p: 1.5, height: '100%' }}>
              <ProductoCard producto={producto} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
