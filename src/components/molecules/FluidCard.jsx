import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProductCard from '@/components/molecules/ProductCard';

const FluidCard = ({ fluid }) => {
  const getFluidIcon = (type) => {
    const iconMap = {
      'Engine Oil': 'Fuel',
      'Transmission Oil': 'Settings',
      'Hydraulic Oil': 'Wrench',
      'Antifreeze Coolant': 'Thermometer',
      'Brake Fluid': 'Disc',
      'Power Steering Fluid': 'Steering',
      'Differential Oil': 'Cog',
      'Transfer Case Oil': 'Box'
    };
    return iconMap[type] || 'Droplets';
  };

  const getFluidColor = (type) => {
    const colorMap = {
      'Engine Oil': 'from-amber-500 to-orange-600',
      'Transmission Oil': 'from-red-500 to-pink-600',
      'Hydraulic Oil': 'from-purple-500 to-indigo-600',
      'Antifreeze Coolant': 'from-cyan-500 to-blue-600',
      'Brake Fluid': 'from-red-600 to-rose-700',
      'Power Steering Fluid': 'from-green-500 to-emerald-600',
      'Differential Oil': 'from-gray-500 to-slate-600',
      'Transfer Case Oil': 'from-yellow-500 to-amber-600'
    };
    return colorMap[type] || 'from-primary to-accent';
  };

  return (
    <div className="fluid-card">
      <div className="flex items-center space-x-4 mb-6">
        <div className={`w-12 h-12 bg-gradient-to-br ${getFluidColor(fluid.type)} rounded-xl flex items-center justify-center shadow-lg`}>
          <ApperIcon name={getFluidIcon(fluid.type)} className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{fluid.type}</h3>
          <p className="text-sm text-gray-600">{fluid.specification}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Required Volume:</span>
          <span className="text-lg font-bold text-primary">{fluid.volume}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <ApperIcon name="ShoppingCart" className="w-5 h-5 text-accent" />
          <span>Recommended Products</span>
        </h4>
        
        <div className="space-y-3">
          {fluid.products.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FluidCard;