// Importaciones para la barra de navegación de Material UI y React Router
import { Box, Button, Container, Stack, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

export function Navbar() {
  // Hook para obtener las categorías desde la API de Platzi (obligatorio)
  const { categories: categorias, loading } = useCategories();

  return (
    <Box sx={{ bgcolor: 'primary.dark', py: 1 }}>
      <Container maxWidth="xl">
        {/* Contenedor flexible usando Stack con estilos sx nativos de Material UI */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2 
          }}
        >
          {/* Enlaces Principales de Navegación de la Tienda Online */}
          <Stack direction="row" spacing={1}>
            <Button component={Link} to="/" color="inherit" sx={{ color: 'white' }}>
              Inicio
            </Button>
            <Button component={Link} to="/productos" color="inherit" sx={{ color: 'white' }}>
              Catálogo
            </Button>
            <Button component={Link} to="/carrito" color="inherit" sx={{ color: 'white' }}>
              Carrito
            </Button>
            <Button component={Link} to="/perfil" color="inherit" sx={{ color: 'white' }}>
              Perfil
            </Button>
            <Button component={Link} to="/contacto" color="inherit" sx={{ color: 'white' }}>
              Contacto
            </Button>
          </Stack>

          {/* Categorías dinámicas traídas directamente de la API de Platzi */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {loading ? (
              <CircularProgress size={20} sx={{ color: 'white' }} />
            ) : (
              // Mostramos un límite máximo de 4 categorías para evitar la saturación visual
              categorias?.slice(0, 4).map((cat) => (
                <Button 
                  key={cat.id} 
                  component={Link} 
                  to={`/productos?category=${cat.id}`} 
                  size="small"
                  sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}
                >
                  {/* Cat.name es el nombre de la categoría */}
                  {cat.name}
                </Button>
              ))
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
