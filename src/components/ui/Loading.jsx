import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-4 bg-gray-200 rounded-lg mx-auto mb-4 shimmer"></div>
        <div className="w-32 h-3 bg-gray-200 rounded-lg mx-auto shimmer"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-xl shimmer"></div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded shimmer"></div>
                <div className="w-20 h-3 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="w-20 h-3 bg-gray-200 rounded shimmer"></div>
                <div className="w-16 h-4 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-32 h-4 bg-gray-200 rounded shimmer"></div>
              
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg shimmer"></div>
                      <div className="flex-1 space-y-2">
                        <div className="w-3/4 h-4 bg-gray-200 rounded shimmer"></div>
                        <div className="w-1/2 h-3 bg-gray-200 rounded shimmer"></div>
                        <div className="w-20 h-8 bg-gray-200 rounded-lg shimmer"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;