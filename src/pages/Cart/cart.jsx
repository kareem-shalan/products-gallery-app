import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import { getProductById } from '../../utils/api/api';
import { formatPrice } from '../../utils/helpers/helpers';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import Swal from "sweetalert";

  export default function CartPage() { 
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details for cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (cart.products.length === 0) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const itemsWithDetails = await Promise.all(
          cart.products.map(async (item) => {
            try {
              const product = await getProductById(item.productId);
              return {
                ...item,
                product
              };
            } catch (error) {
              console.error(`Failed to fetch product ${item.productId}:`, error);
              return {
                ...item,
                product: null
              };
            }
          })
        );
        setCartItems(itemsWithDetails);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cart.products]);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => 
    {
    removeFromCart(productId);
  
 
    toast.success("Product removed from cart");
  };

  const handleClearCart =   () => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        clearCart();
        toast.success("Cart cleared");
      }
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.product) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    return subtotal + shipping;
  };

  if (loading) {
    return <LoadingSpinner message="Loading cart..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Error Loading Cart
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Continue Shopping
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div key={item.productId} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                {item.product ? (
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.product.category}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-gray-900 dark:text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      Product information unavailable
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="mt-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Remove Item
                    </button>
                  </div>
                )}
                        </div>
                    ))}

            {/* Clear Cart Button */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{calculateSubtotal() > 50 ? 'Free' : formatPrice(5.99)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
                </div>
            </div>
    </div>
  
  );
}
