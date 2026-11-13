import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { ProductoCard } from '../components/ProductoCard';
import { Grid, Typography, Box, TextField, MenuItem, CircularProgress, Alert, Pagination } from '@mui/material';

export function Productos() {
  // useState obligatorios para buscador y el paginado de la interfaz
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category') || 'todas';
  const [categoria, setCategoria] = useState(catParam);

  // Consumo de datos mediante los Custom Hooks obligatorios
  const { products, loading, error } = useProducts(80, 0);
  const { categories } = useCategories();

  // Sincroniza la categoría si el usuario hace clic en los accesos rápidos del Navbar
  useEffect(() => { 
    setCategoria(catParam); 
    setPagina(1); 
  }, [catParam]);

  // Manejo de estados de carga y errores de conexión con la API
  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error al conectar con la API: {error}</Alert>;

  // Lógica de filtrado combinada para buscador y categorías
  const filtrados = products.filter((p) => {
    const matchName = p.title.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat = categoria === 'todas' || p.category?.id === Number(categoria);
    return matchName && matchCat;
  });

  // Configuración de la paginación local en base a los artículos filtrados
  const porPagina = 8;
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const paginados = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Catálogo de Productos</Typography>
      {/* Controles superiores: Buscador y Selector de categorías */}
      <Grid container spacing={2} sx={{ mb: 4, mt: 1 }}>
        <Grid item xs={12} sm={8}>
          <TextField 
            fullWidth 
            label="Buscar productos por nombre..." 
            value={busqueda} 
            onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            select 
            fullWidth 
            label="Categoría" 
            value={categoria} 
            onChange={(e) => { setCategoria(e.target.value); setPagina(1); }}
          >
            <MenuItem value="todas">Todas las categorías</MenuItem>
            {categories?.slice(0, 5).map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* grilla de productos */}
      {paginados.length === 0 ? (
        <Alert severity="info">No se encontraron productos que coincidan con la búsqueda.</Alert>
      ) : (
      <Grid container spacing={3}>
        {paginados.map((p) => (
          <Grid
          key={p.id} 
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProductoCard producto={p} />
          </Grid>
        ))}
      </Grid>
      )}
      {/* Selector gráfico de paginación */}
      {totalPaginas > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={totalPaginas} 
            page={pagina} 
            onChange={(e, v) => {
              setPagina(v);
              window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave hacia arriba
            }} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
}
