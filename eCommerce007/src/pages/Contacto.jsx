import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Paper, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';

export function Contacto() {
  // Estados para los campos controlados del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estados para la gestión de alertas
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    setExito(false);

    // 1. Validación: Campos vacíos
    if (!nombre.trim() || !email.trim() || !asunto.trim() || !mensaje.trim()) {
      setError('Por favor, completa todos los campos del formulario.');
      return;
    }

    // 2. Validación: Formato de correo electrónico
    const expresionEmail = /\S+@\S+\.\S+/;
    if (!expresionEmail.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Si todo es correcto, simulamos el envío de datos exitoso
    setExito(true);
    
    // Limpiamos los campos del formulario
    setNombre('');
    setEmail('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={4}>
          
          {/* Lado Izquierdo: Información de contacto de la tienda */}
          <Grid size={{ xs:12, md:4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
              <EmailIcon fontSize="large" />
              <Typography variant="h5" fontWeight="bold">
                Contacto
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              ¿Tenés alguna duda sobre tu pedido, stock disponible o reembolsos?
              Satisfacción garantizada o te devolvemos tu dinero.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completá el formulario de soporte y nuestro equipo te responderá por correo en menos de 24 horas hábiles.
            </Typography>
          </Grid>

          {/* Lado Derecho: Formulario Interactivo */}
          <Grid item xs={12} md={8}>
            <Typography component="h1" variant="h6" fontWeight="bold" gutterBottom>
              Formulario de Atención
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {exito && <Alert severity="success" sx={{ mb: 2 }}>¡Tu mensaje fue enviado con éxito! Nos comunicaremos pronto.</Alert>}

            <Box component="form" onSubmit={manejarEnvio} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="asunto"
                    label="Asunto"
                    name="asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="mensaje"
                    label="Mensaje"
                    name="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                sx={{ mt: 3, py: 1.2, px: 4 }}
              >
                Enviar Mensaje
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}
