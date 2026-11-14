import { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

const CartContext = createContext();

// Función auxiliar para leer el carrito de un usuario específico
function leerCarritoStorage(email) {
  if (!email) return [];
  try {
    const guardado = window.localStorage.getItem(`carrito-007-${email}`);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    return [];
  }
}

export function CartProvider({ children }) {
  const { usuario } = useUser();

  // 1. Al cargar o presionar F5, lee directamente el carrito del usuario activo
  const [carrito, setCarrito] = useState(() => leerCarritoStorage(usuario?.email));

  // 2. Sincroniza el estado cuando el usuario cambia (al hacer login o logout)
  useEffect(() => {
    setCarrito(leerCarritoStorage(usuario?.email));
  }, [usuario?.email]);

  // Función auxiliar para actualizar el estado y guardar en localStorage al mismo tiempo
  const actualizarYGuardar = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    if (usuario?.email) {
      window.localStorage.setItem(`carrito-007-${usuario.email}`, JSON.stringify(nuevoCarrito));
    }
  };

  // CRUD del carrito protegido
  const agregarProducto = (producto, cantidad = 1) => {
    if (!usuario) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return false;
    }

    const existe = carrito.find((item) => item.id === producto.id);
    const nuevoCarrito = existe
      ? carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      : [...carrito, { ...producto, cantidad }];

    actualizarYGuardar(nuevoCarrito);
    return true;
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    actualizarYGuardar(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    actualizarYGuardar([]);
  };

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, total, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
