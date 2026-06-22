// Importaciones de React y Material UI para el Footer
import { Box, Container, Typography, Grid, Link as MuiLink, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Componente Footer con diseño moderno y profesional
export function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'grey.900', 
        color: 'grey.400', 
        py: 6, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'grey.800'
      }}
    >
      <Container maxWidth="xl">
        {/* Grilla principal */}
        <Grid container spacing={4}>
          
          {/* Columna 1: Información de la Empresa */}
          <Grid xs={12} md={4}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
                Compras 007
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Tu plataforma digital de confianza para adquirir la mejor tecnología y accesorios del mercado con un servicio de primer nivel.
              </Typography>
            </Box>
          </Grid>

          {/* Columna 2: Datos de Contacto (Obligatorio)*/}
          <Grid xs={12} sm={6} md={4}>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle1" color="white" fontWeight="bold" gutterBottom>
                Contacto
              </Typography>
              <Stack spacing={1.5}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon fontSize="small" color="primary" />
                  <Typography variant="body2">antonio007@hotmail.com</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon fontSize="small" color="primary" />
                  <Typography variant="body2">3752254565</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon fontSize="small" color="primary" />
                  <Typography variant="body2">Ningun lugar, Kansas</Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Columna 3: Redes Sociales Ficticias */}
          <Grid xs={12} sm={6} md={3}>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle1" color="white" fontWeight="bold" gutterBottom>
                {/* Antonio por que es el 008 */}
                Antonio's Bond
              </Typography>
              <Stack direction="row" spacing={2}>
                <MuiLink href="https://www.facebook.com/profile.php?id=61578094256826&locale=es_LA" target="_blank" rel="noopener" color="inherit">
                  <FacebookIcon />
                </MuiLink>
                <MuiLink href="https://instagram.com/jamesbondclothes/" target="_blank" rel="noopener" color="inherit">
                  <InstagramIcon />
                </MuiLink>
                <MuiLink href="https://x.com/007?lang=es" target="_blank" rel="noopener" color="inherit">
                  <TwitterIcon />
                </MuiLink>
              </Stack>
            </Box>
          </Grid>

        </Grid>

        {/* Barra Inferior del Copyright Especial Requerido */}
        <Box 
          sx={{ 
            borderTop: '1px solid', 
            borderColor: 'grey.800', 
            mt: 4, 
            pt: 3, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Copyright 1986 todos los derechos y los izquierdos bien puestos
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
