import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';

//descompuesto por partes. ReactDOM: el reactDOM es el que se encarga de renderizar
//la aplicación en el DOM, es decir, en el navegador; CreateRoot: es un método que crea un contenedor raíz para la
//aplicación; los parametros que recibe son el elemento del DOM donde se va a renderizar la aplicación,
// en este caso el elemento con id 'root'.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
// aca el reactDOM es el que se encarga de renderizar la aplicación en el DOM, es decir, en el navegador.
// el react.strictMode es una herramienta de desarrollo que nos ayuda a detectar errores en el código, 
//pero no afecta el rendimiento de la aplicación.
// el themeContextProvider es un componente que nos permite compartir el estado del tema (claro u oscuro) 
//entre todos los componentes de la aplicación, sin necesidad de pasar props manualmente.
// el App es el componente principal de la aplicación, que contiene todos los demás componentes y la lógica de la aplicación.