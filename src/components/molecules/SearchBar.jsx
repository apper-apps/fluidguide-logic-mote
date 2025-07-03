import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by vehicle make, model, or year..."
          className="w-full px-6 py-4 pl-12 pr-20 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-lg shadow-lg"
        />
        
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <ApperIcon name="Search" className="w-6 h-6 text-gray-400" />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Search
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;