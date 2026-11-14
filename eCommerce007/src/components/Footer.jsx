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
        py: 0.5, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'grey.800'
      }}
    >
      <Container maxWidth="xl">
        {/* Grilla principal */}
        <Grid container spacing={2}>
          
          {/* Columna 1: Información de la Empresa */}
          <Grid xs={12} md={5}>
              <Typography variant="subtitle1" color="white" fontWeight="bold" gutterBottom>
                Compras 007
              </Typography>
              <Typography variant="caption" display="block" sx={{ lineHeight: 1.4 }}>
                Ni en la placita encontrás estos productos guacho.
              </Typography>
          </Grid>

          {/* Columna 2: Datos de Contacto (Obligatorio)*/}
          <Grid 
          size={{ xs:12, sm:6, md:4 }}>
              <Typography variant="subtitle2" color="white" fontWeight="bold" gutterBottom>
                Contacto
              </Typography>
              <Stack spacing={0}>
                <Box display="flex" alignitems="center" gap={1}>
                  <EmailIcon sx={{ fontSize: 16 }} color="primary" />
                  <Typography variant="caption"> antonio007@hotmail.com</Typography>
                </Box>
                <Box display="flex" alignitems="center" gap={1}>
                  <PhoneIcon sx={{ fontSize: 16 }} color="primary" />
                  <Typography variant="caption"> 3752254565</Typography>
                </Box>
                <Box display="flex" alignitems="center" gap={1}>
                  <LocationOnIcon sx={{ fontSize: 16 }} color="primary" />
                  <Typography variant="caption"> Ningun lugar, Kansas</Typography>
                </Box>
              </Stack>
          </Grid>

          {/* Columna 3: Redes Sociales Ficticias */}
          <Grid xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="white" fontWeight="bold" gutterBottom>
                {/* iconos de redes sociales */}
                Antonio Bond
              </Typography>
              <Stack direction="row" spacing={1}>
                <MuiLink href="https://www.facebook.com/profile.php?id=61578094256826&locale=es_LA" target="_blank" rel="noopener" color="inherit">
                  <FacebookIcon fontSize='small' />
                </MuiLink>
                <MuiLink href="https://instagram.com/jamesbondclothes/" target="_blank" rel="noopener" color="inherit">
                  <InstagramIcon fontSize='small'/>
                </MuiLink>
                <MuiLink href="https://x.com/007?lang=es" target="_blank" rel="noopener" color="inherit">
                  <TwitterIcon fontSize='small'/>
                </MuiLink>
              </Stack>
          </Grid>

        </Grid>

        {/* Barra Inferior del Copyright Especial Requerido */}
        <Box 
          sx={{ 
            borderTop: '0.5px solid', 
            borderColor: 'grey.800', 
            mt: 0.5, 
            pt: 0.5, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
            Copyright 1986 todos los derechos y los izquierdos bien puestos
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
