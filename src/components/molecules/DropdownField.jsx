import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const DropdownField = ({ label, value, onChange, options, placeholder, disabled, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        disabled={disabled || loading}
        className={`dropdown-field ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'} ${
          isOpen ? 'border-primary ring-2 ring-primary/20' : ''
        }`}
      >
        <span className={`block truncate ${!value ? 'text-gray-400' : 'text-gray-900'}`}>
          {loading ? 'Loading...' : (value || placeholder)}
        </span>
        
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <ApperIcon name="Loader2" className="w-5 h-5 text-gray-400" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="ChevronDown" className="w-5 h-5 text-gray-400" />
            </motion.div>
          )}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && !disabled && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">No options available</div>
            ) : (
              options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                >
                  {option}
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DropdownField;