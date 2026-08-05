// Imporaciones de Material-UI y React Router
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ColorModeContext } from '../contexts/ThemeContext.jsx';

// Parte de arriba de la página con el logo, nombre y botón de bienvenida
export function Header() {
  const colorMode = useContext(ColorModeContext);

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
              Home
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
              aria-label="toggle dark mode"
            >
              {colorMode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Botón de Bienvenida (Obligatorio) */}
            <Button 
              variant="outlined" 
              component={Link} to="/perfil" color="inherit" sx={{ color: 'white' }}
            >
              Perfil
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
