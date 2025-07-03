import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-xl border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Droplets" className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FluidGuide Pro
              </h1>
              <p className="text-xs text-secondary hidden sm:block">Vehicle Fluid Advisor</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Search
            </Link>
            <div className="flex items-center space-x-2 text-secondary">
              <ApperIcon name="Users" className="w-4 h-4" />
              <span className="text-sm">No Registration Required</span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-3 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Search
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;