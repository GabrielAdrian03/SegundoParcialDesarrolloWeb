import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { product, loading, error };
}
