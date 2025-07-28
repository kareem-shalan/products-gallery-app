import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductSlider from '../../components/Slider/Slider.jsx';
import { CartContext } from '../../context/CartContext.jsx';

const Home = () => {
  const { addToCart, loading } = useContext(CartContext);

  const handleQuickAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to{' '}
          <span className="text-blue-600 dark:text-blue-400">Product</span>{' '}
          <span className='text-red-500'>Gallery</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Discover amazing products from our curated collection. Browse through categories,
          find the perfect items, and enjoy a seamless shopping experience with dark mode support.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Explore Products
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Product Slider */}
      <div className=''>
        <ProductSlider onAddToCart={handleQuickAddToCart} loading={loading} /></div>

      {/* Additional Section */}
      <div className="mt-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose Our Products?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-400">All products are carefully selected for quality and durability.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-400">Competitive pricing with regular discounts and offers.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick and reliable shipping to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 