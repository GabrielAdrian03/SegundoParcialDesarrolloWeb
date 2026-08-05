# Estructura de `src`

Breve guía de para qué sirve cada carpeta y archivos principales del proyecto.

- **assets/**: Recursos estáticos como imágenes, iconos y fuentes usados por la UI.
- **components/**: Componentes reutilizables de la interfaz (Header, Footer, Navbar, ProductoCard, etc.). Son piezas pequeñas que se usan en varias páginas.
- **contexts/**: Proveedores React Context que almacenan estado global y lógica compartida (por ejemplo `CartContext.jsx`, `UserContext.jsx`, `ThemeContext.jsx`).
- **hooks/**: Custom hooks para encapsular lógica reutilizable y efectos (ej. `useProducts`, `useCategories`, `useFetch`, `useProductDetail`).
- **pages/**: Vistas completas mapeadas a rutas (Home, Productos, DetalleProducto, Carrito, Login, Perfil, Registro, Contacto). Cada archivo representa una pantalla.
- **routes/**: Configuración del enrutado de la aplicación (por ejemplo `AppRoutes.jsx`), layout compartido y rutas públicas.
- **services/**: Capa de acceso a datos y utilidades (ej. `api.js`): fetch a la API, normalización de datos y helpers relacionados con datos.

Archivos importantes en la raíz de `src`:

- `main.jsx`: Punto de entrada que monta React y proveedores (ahora envuelto por `ThemeContextProvider`).
- `App.jsx`: Componente raíz que renderiza las rutas.
- `index.css` / `App.css`: Estilos globales y variables CSS.

Notas rápidas:

- Las categorías mostradas en el `Navbar` se obtienen desde `services/api.js` y se normalizan allí.
- El tema claro/oscuro se controla con `contexts/ThemeContext.jsx`; la preferencia se guarda en `localStorage` para persistir entre recargas.
