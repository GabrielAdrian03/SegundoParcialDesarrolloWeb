// Importación del router de React Router Dom
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
// Importación de Proveedores (Obligatorio)
import { CartProvider } from '../contexts/CartContext.jsx';
import { UserProvider, useUser } from '../contexts/UserContext';

// Importación de las 8 Páginas
import { Home } from '../pages/Home';
import { Productos } from '../pages/Productos';
import { DetalleProducto } from '../pages/DetalleProducto';
import { Login } from '../pages/Login';
import { Registro } from '../pages/Registro';
import { Carrito } from '../pages/Carrito';
import { Perfil } from '../pages/Perfil';
import { Contacto } from '../pages/Contacto';

// Importación de Componentes Estructura (Quedan Fijos)
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '@mui/material';

//rutas protegidas para usuarios logeados (Perfil y Carrito)
function RutaProtegida({ children }) {
  const { usuario } = useUser();
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return children;
}

// Layout compartido para mantener Header, Navbar y Footer estaticos en todas las páginas
function Layout() {
  return (
    <>
      <Header />
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, minHeight: '75vh' }}>
        {/* Renderiza la pantalla correspondiente según la URL de React Router */}
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export function AppRoutes() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Todas las rutas dentro del Layout visual compartido */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/carrito" element={<Carrito />} />
              {/* Ruta protegida para el perfil del usuario */}
              <Route path="/perfil" element={ <RutaProtegida> <Perfil /> </RutaProtegida> }/>
              <Route path="/contacto" element={<Contacto />} />
            </Route>

            {/*error 404 para otra ruta inválida (obligatorio)*/}
            <Route path="*" element={<h2>Error 404 - Ésta página no está encontrada maestro</h2>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}
