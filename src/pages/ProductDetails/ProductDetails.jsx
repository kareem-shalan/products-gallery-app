import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../../utils/api/api';
import { formatPrice, isValidProductId } from '../../utils/helpers/helpers';
import { CartContext } from '../../context/CartContext.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, loading: cartLoading } = useContext(CartContext); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addToCartMessage, setAddToCartMessage] = useState('');

  useEffect(() => {
    // Validate product ID
    if (!isValidProductId(id)) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    setAddToCartMessage(result.message);
    toast.success(result.message);  
    
    if (result.success) {
      // Clear message after 3 seconds
      setTimeout(() => setAddToCartMessage(''), 3000);
     
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Product Not Found
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Back to Products
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Products
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white font-medium">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md mx-auto object-contain"
            style={{ height: '500px' }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>
            
            {/* Category */}
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full capitalize mb-4">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating.rate)
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-6">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  +
            </button>
              </div>
            </div>

            {/* Add to Cart Message */}
            {addToCartMessage && (
              <div className={`p-3 rounded-lg text-sm font-medium ${
                addToCartMessage.includes('added') 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
              }`}>
                {addToCartMessage}
              </div>
            )}

            <button 
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
          
          </div>

          {/* Product Features */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Features
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free shipping on orders over $50
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30-day return policy
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Secure payment processing
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                24/7 customer support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 