import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ icon = "Database", title, description, actionLabel, onAction }) => {
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
          className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {actionLabel && onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>{actionLabel}</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;