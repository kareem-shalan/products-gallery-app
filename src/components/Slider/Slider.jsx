import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getProducts } from "../../utils/api/api";
import toast from "react-hot-toast";

function ProductSlider({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getProducts();
                console.log("Fetched products:", data);
                setProducts(data.slice(0, 8)); // Limit to 8 products
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (loading) {
        return (
            <div className="py-16 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-16 text-center">
                <div className="text-red-500 dark:text-red-400">
                    <p>Error loading products: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-500 dark:text-gray-400">No products available</p>
            </div>
        );
    }

    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="text-center mb-12 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Featured 
                    <span className="text-blue-600 dark:text-blue-400">Products</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover our handpicked collection of premium products
                </p>
            </div>

            {/* Slider Container */}
            <div className="max-w-7xl mx-auto px-4">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.id} className="px-4">
                            {/* Main Card Container with Group */}
                            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:scale-105">
                                
                                {/* Product Image Container */}
                                <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                    <Link to={`/products/${product.id}`} className="block h-full">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                                          
                                        />
                                    </Link>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-full uppercase tracking-wide shadow-lg">
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Rating Badge */}
                                    {product.rating && (
                                        <div className="absolute top-4 right-4">
                                            <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
                                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {product.rating.rate}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quick Add Button */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (onAddToCart) {
                                                onAddToCart(product);
                                                toast.success("Product added to cart");
                                            }
                                        }}
                                        title="Quick Add to Cart"
                                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Product Info - NOT clickable */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 h-12 overflow-hidden group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                ${product.price}
                                            </span>
                                            {product.rating && (
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    ({product.rating.count} reviews)
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* View Details Button - Optional: You can make this clickable too */}
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold cursor-pointer">
                                            Click image to view details →
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-2xl pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Link
                    to="/products"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                    View All Products
                    <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default ProductSlider;
