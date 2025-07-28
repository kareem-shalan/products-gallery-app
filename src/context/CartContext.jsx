/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { createCart, updateCart } from '../utils/api/api';

// Create and export the context directly
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    try {
      const existingProductIndex = cart.products.findIndex(
        item => item.productId === product.id
      );

      let updatedCart;
      if (existingProductIndex >= 0) {
        const updatedProducts = [...cart.products];
        updatedProducts[existingProductIndex].quantity += quantity;
        updatedCart = { ...cart, products: updatedProducts };
      } else {
        const newProduct = { productId: product.id, quantity };
        updatedCart = { ...cart, products: [...cart.products, newProduct] };
      }

      setCart(updatedCart);

      try {
        if (cart.id) {
          await updateCart(cart.id, updatedCart);
        } else {
          const apiCart = await createCart(updatedCart);
          setCart({ ...updatedCart, id: apiCart.id });
        }
      } catch (apiError) {
        console.warn('API sync failed:', apiError);
      }

      return { success: true, message: 'Product added to cart!' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Failed to add product to cart' };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    const updatedProducts = cart.products.filter(
      item => item.productId !== productId
    );
    const updatedCart = { ...cart, products: updatedProducts };
    setCart(updatedCart);
    return { success: true, message: 'Product removed from cart!' };
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    const updatedProducts = cart.products.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    const updatedCart = { ...cart, products: updatedProducts };
    setCart(updatedCart);
    return { success: true, message: 'Quantity updated!' };
  };

  const clearCart = () => {
    const emptyCart = { ...cart, products: [] };
    setCart(emptyCart);
    return { success: true, message: 'Cart cleared!' };
  };

  const getCartItemCount = () => {
    return cart.products.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
