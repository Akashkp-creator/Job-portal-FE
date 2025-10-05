const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Animated Logo */}
      <div className="mb-8 transform animate-float">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">CC</span>
        </div>
      </div>

      {/* Wave Dots */}
      <div className="flex space-x-2 mb-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-wave"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        CareerConnect
      </h3>
      <p className="text-gray-500 mb-4">Loading amazing opportunities</p>

      {/* Rotating Circle */}
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-4 border-teal-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-teal-500 rounded-full animate-spin border-t-transparent border-r-transparent"></div>
      </div>
    </div>
  );
};
export default Loading;
