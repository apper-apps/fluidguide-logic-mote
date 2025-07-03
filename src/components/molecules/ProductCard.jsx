import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProductCard = ({ product }) => {
  const handlePurchaseClick = () => {
    window.open(product.purchaseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-card">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-12 h-12 bg-gray-200 rounded-lg items-center justify-center hidden">
            <ApperIcon name="Package" className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h5 className="font-semibold text-gray-800 truncate">{product.name}</h5>
          <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePurchaseClick}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ApperIcon name="ExternalLink" className="w-4 h-4" />
            <span>Buy Now</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;