import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Droplets" className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FluidGuide Pro
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="/search" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Search
            </a>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.emailAddress || 'User'}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                Get Started
              </motion.button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4 space-y-4"
            >
              <a href="/" className="block text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="/search" className="block text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
                Search
              </a>
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    Welcome, {user?.firstName || user?.emailAddress || 'User'}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  Get Started
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;