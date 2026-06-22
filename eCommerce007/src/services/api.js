const BASE_URL = 'https://dummyjson.com';
let cachedCategories = null;

const normalizeCategory = (item, index) => {
  if (typeof item === 'string') {
    return {
      id: index + 1,
      name: item,
      slug: item.toLowerCase().replace(/\s+/g, '-')
    };
  }

  return {
    id: index + 1,
    ...item,
    slug: item.slug || item.name.toLowerCase().replace(/\s+/g, '-')
  };
};

const normalizeProduct = (product, categories) => {
  const categoryName = product.category || '';
  const matchedCategory = categories.find(
    (cat) => cat.slug === categoryName.toLowerCase() || cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  return {
    ...product,
    category: matchedCategory || {
      id: -1,
      name: categoryName || 'General',
      slug: categoryName.toLowerCase()
    }
  };
};

const ensureCategories = async () => {
  if (cachedCategories) return cachedCategories;

  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Error al obtener categorías');

  const rawCategories = await response.json();
  cachedCategories = rawCategories.map(normalizeCategory);
  return cachedCategories;
};

export const apiService = {
  getProducts: async (limit = 20, offset = 0) => {
    const categories = await ensureCategories();
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${offset}`);
    if (!response.ok) throw new Error('Error al obtener productos');

    const data = await response.json();
    return data.products.map((product) => normalizeProduct(product, categories));
  },

  getProductById: async (id) => {
    const categories = await ensureCategories();
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Producto no encontrado');

    const data = await response.json();
    return normalizeProduct(data, categories);
  },

  getCategories: async () => {
    return ensureCategories();
  }
};
