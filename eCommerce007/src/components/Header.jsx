// Imporaciones de Material-UI y React Router
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

// Parte de arriba de la página con el logo, nombre y botón de bienvenida
export function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* Contenedor del Logo y Nombre del E-commerce */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              textDecoration: 'none', 
              color: 'primary.main' 
            }}
          >
            {/* Llamada al ícono como etiqueta React */}
            <StorefrontIcon fontSize="large" />
            <Typography variant="h5" fontWeight="bold" component="div">
              Powered by PlatziStore
            </Typography>
          </Box>

          {/* Botón de Bienvenida (Obligatorio) */}
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => alert('bienvenido al mercado 007')}
          >
            Bienvenido
          </Button>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
