// Acá importo createContext, useState, useContext y useEffect de React
import { createContext, useState, useContext, useEffect } from 'react';

// Se crea el contexto del carrito de compras.
const CartContext = createContext();

export function CartProvider({ children }) {
  // useState obligatorio para el Carrito (inicia leyendo localStorage)
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = window.localStorage.getItem('carrito-007');
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      return [];
    }
  });

  // Guarda automáticamente en localStorage cada vez que el carrito cambia
  useEffect(() => {
    window.localStorage.setItem('carrito-007', JSON.stringify(carrito));
  }, [carrito]);

  // CRUD del carrito (Obligatorio)
  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Atributo "total" requerido
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, total, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Se exporta un hook de useCart para acceder al contexto desde cualquier componente.
export function useCart() {
  return useContext(CartContext);
}
