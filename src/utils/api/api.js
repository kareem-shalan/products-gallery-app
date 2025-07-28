import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Get all products
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products: ' + error.message);
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product: ' + error.message);
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories: ' + error.message);
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products by category: ' + error.message);
  }
};

// Cart API functions
export const getCarts = async () => {
  try {
    const response = await api.get('/carts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch carts: ' + error.message);
  }
};

export const getCartById = async (id) => {
  try {
    const response = await api.get(`/carts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cart: ' + error.message);
  }
};

export const createCart = async (cartData) => {
  try {
    const response = await api.post('/carts', cartData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create cart: ' + error.message);
  }
};

export const updateCart = async (id, cartData) => {
  try {
    const response = await api.put(`/carts/${id}`, cartData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update cart: ' + error.message);
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await api.delete(`/carts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete cart: ' + error.message);
  }
};

// Helper function to add product to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    // Create a new cart with the product
    const cartData = {
      userId: 1, 
      date: new Date().toISOString(),
      products: [
        {
          productId: productId,
          quantity: quantity
        }
      ]
    };
    
    const response = await api.post('/carts', cartData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add to cart: ' + error.message);
  }
};
