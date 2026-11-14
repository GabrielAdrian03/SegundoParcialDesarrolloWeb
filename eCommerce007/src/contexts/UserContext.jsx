// Importa createContext, useState, useContext y useEffect de React
import { createContext, useState, useContext, useEffect } from 'react';

// Crea el contexto de Usuario
const UserContext = createContext();

export function UserProvider({ children }) {
  // useState obligatorio para el Usuario (inicia leyendo la sesión activa en localStorage)
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioGuardado = window.localStorage.getItem('usuario-007');
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    } catch (error) {
      return null;
    }
  });

  // Lista opcional de usuarios registrados en localStorage para simular base de datos local
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(() => {
    try {
      const lista = window.localStorage.getItem('usuarios-registrados-007');
      return lista ? JSON.parse(lista) : [];
    } catch (error) {
      return [];
    }
  });

  const [pendienteRegistro, setPendienteRegistro] = useState(null);

  // useEffect obligatorio para Logear usuario y guardar/limpiar sesión en localStorage
  useEffect(() => {
    if (usuario) {
      console.log(`Efecto de Login: Bienvenido ${usuario.nombre}`);
      window.localStorage.setItem('usuario-007', JSON.stringify(usuario));
    } else {
      window.localStorage.removeItem('usuario-007');
    }
  }, [usuario]);

  // useEffect obligatorio para Crear usuario y guardarlo en localStorage
  useEffect(() => {
    if (pendienteRegistro) {
      console.log("Efecto de Registro: Creando usuario en sistema...", pendienteRegistro);
      setUsuariosRegistrados((prev) => {
        const nuevaLista = [...prev, pendienteRegistro];
        window.localStorage.setItem('usuarios-registrados-007', JSON.stringify(nuevaLista));
        return nuevaLista;
      });
      setPendienteRegistro(null);
    }
  }, [pendienteRegistro]);

  const login = (email, nombre = 'Usuario Invitado') => {
    // Busca si el correo fue registrado previamente para recuperar su nombre real
    const encontrado = usuariosRegistrados.find((u) => u.email === email);
    setUsuario({ 
      nombre: encontrado ? encontrado.nombre : nombre, 
      email 
    });
  };

  const logout = () => {
    setUsuario(null);
  };

  const registro = (datosUsuario) => {
    setPendienteRegistro(datosUsuario);
  };

  return (
    <UserContext.Provider value={{ usuario, usuariosRegistrados, login, logout, registro }}>
      {children}
    </UserContext.Provider>
  );
}

// Exporta el hook personalizado para usar el contexto de Usuario
export function useUser() {
  return useContext(UserContext);
}
