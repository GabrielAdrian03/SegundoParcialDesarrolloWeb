import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Definición de estilo y paleta de colores de libre elección con Material UI
const temaPersonalizado = createTheme({
  palette: {
    primary: {
      main: '#0070f3', // Azul moderno corporativo para Compras 007
    },
    secondary: {
      main: '#ff007f', // Rosa vibrante para contrastes
    },
    background: {
      default: '#f4f6f8', // Gris muy suave de fondo general
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={temaPersonalizado}>
      {/* CssBaseline normaliza los estilos CSS nativos en todos los navegadores */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
