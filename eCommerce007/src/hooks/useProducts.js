import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function useProducts(limit = 80, offset = 0) {
  // useState obligatorios para productos, loading y error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect obligatorio para obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts(limit, offset);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, offset]);

  return { products, loading, error, setProducts };
}
