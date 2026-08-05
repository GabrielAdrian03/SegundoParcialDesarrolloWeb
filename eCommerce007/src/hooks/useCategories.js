import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function useCategories() {
  // Aca el userState funciona como un estado local para almacenar las categorías obtenidas de la API.
  // Inicialmente, se establece como un array vacío.
  // El segundo estado, "loading", se utiliza para indicar si la carga de categorías está en progreso,
  // y se inicializa como true.
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para obtener categorías (Obligatorio)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        // Una vez que se obtienen los datos de las categorías, se actualiza el estado "categories"
        // con la información recibida.
        setCategories(data);
      } catch (err) {
        //Sino se captura el error y se muestra en la consola.
        console.error("Error categories:", err);
      } finally {
        // finnaly por que se ejecuta tanto si la solicitud fue exitosa como si ocurrió un error,
        // y se establece el estado "loading" en false para indicar que la carga ha finalizado.
        setLoading(false);
      }
    };
    // fetchCategories se llama dentro del useEffect para iniciar la carga de categorías
    // cuando el componente se monta.
    fetchCategories();
  }, []);

  // Regresa un objeto que contiene las categorías obtenidas y el estado de carga.
  // Esto permite a los componentes que utilizan este hook acceder a las categorías
  // y saber si aún se están cargando.
  return { categories, loading };
}
