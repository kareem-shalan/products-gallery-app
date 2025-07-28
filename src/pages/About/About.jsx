import React from 'react'

export default function About() {
  return (
    <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center'>About Us</h1>
        
    
      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Smart Search
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Find products quickly with our intelligent search functionality.
          </p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Sort & Filter
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Organize products by price, name, and other criteria.
          </p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Dark Mode
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Toggle between light and dark themes for comfortable browsing.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">20+</div>
            <div className="text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4</div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-400">Responsive</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Available</div>
          </div>
        </div>
      </div>
    </div>
  )
}
