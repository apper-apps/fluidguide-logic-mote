import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-gradient-to-br from-error/20 to-error/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertCircle" className="w-10 h-10 text-error" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ApperIcon name="RefreshCw" className="w-5 h-5" />
            <span>Try Again</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;