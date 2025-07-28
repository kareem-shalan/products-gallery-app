const LoadingSpinner = ({ size = "large", message = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400 ${sizeClasses[size]}`}></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 