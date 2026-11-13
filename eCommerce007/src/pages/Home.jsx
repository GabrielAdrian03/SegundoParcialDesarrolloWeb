import { useProducts } from '../hooks/useProducts';
import { ProductoCard } from '../components/ProductoCard';
import { Grid, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';

export function Home() {
  //lote de productos usando el Hook
  const { products: productos, loading, error } = useProducts(30, 0);

  //mezcla el array y recorta 8 unidades randoms
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
          p: 0.5, 
          borderRadius: 2, 
          mb: 6,
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
          ¡Bienvenidos a Compras 007!
        </Typography>
        <img 
        src="https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg"
         style={{ 
          width: '50%',
          maxHeight: '170px',
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '8px' 
          }}/>
      </Box>

      {/* Título de la Sección de Productos */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
        Productos Destacados
      </Typography>

      {/* Grilla */}
      <container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {productosDestacados.map((producto) => (
            <Grid 
            key={producto.id} 
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <ProductoCard producto={producto} />
            </Grid>
          ))}
        </Grid>
      </container>
    </Box>
  );
}
