// Importa createContext, useState, useContext y useEffect de React
import { createContext, useState, useContext, useEffect } from 'react';

// Crea el contexto de Usuario
const UserContext = createContext();

export function UserProvider({ children }) {
  // useState obligatorio para el Usuario
  const [usuario, setUsuario] = useState(null);
  const [pendienteRegistro, setPendienteRegistro] = useState(null);

  // useEffect obligatorio para Logear usuario / Simular sesión activa
  useEffect(() => {
    if (usuario) {
      console.log(`Efecto de Login: Bienvenido ${usuario.nombre}`);
    }
  }, [usuario]);

  // useEffect obligatorio para Crear usuario (Simulación en consola)
  useEffect(() => {
    if (pendienteRegistro) {
      console.log("Efecto de Registro: Creando usuario en sistema...", pendienteRegistro);
      setPendienteRegistro(null);
    }
  }, [pendienteRegistro]);

  const login = (email, nombre = 'Usuario Invitado') => {
    setUsuario({ nombre, email });
  };

  const logout = () => {
    setUsuario(null);
  };

  const registro = (datosUsuario) => {
    setPendienteRegistro(datosUsuario);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout, registro }}>
      {children}
    </UserContext.Provider>
  );
}

// Exporta el hook personalizado para usar el contexto de Usuario
export function useUser() {
  return useContext(UserContext);
}
