import { Link } from 'react-router-dom';
import { formatPrice, truncateText } from '../../utils/helpers/helpers';
import { CartContext } from '../../context/CartContext.jsx';  
import { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  function handleAddToCart(product) {

    setIsLoading(true);
    addToCart(product);
    toast.success('Product added to cart');
    setIsLoading(false);
  }

  return (

    <div className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Link
          to={`/products/${product.id}`}
          className=""
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {truncateText(product.title, 25)}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatPrice(product.price)}
          </span>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${index < Math.floor(product.rating.rate)
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
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.rating.count})
              </span>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      <div className="relative group p-4 transition-all duration-300">
      
        <button
          onClick={() => handleAddToCart(product)}
          disabled={isLoading}
          className="bg-blue-500 text-white w-full px-4 py-2 rounded-md absolute top-1/2 left-0 opacity-0 translate-y-[-50%] group-hover:opacity-100 group-hover:top-1/2 transition-all duration-300"
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>

    </div>

  );
};

export default ProductCard; 