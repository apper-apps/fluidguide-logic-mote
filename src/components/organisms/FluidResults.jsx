import { motion } from 'framer-motion';
import FluidCard from '@/components/molecules/FluidCard';
import Loading from '@/components/ui/Loading';
import Empty from '@/components/ui/Empty';

const FluidResults = ({ fluids, loading, selectedVehicle }) => {
  if (loading) {
    return <Loading />;
  }

  if (!selectedVehicle || !selectedVehicle.brand || !selectedVehicle.model || !selectedVehicle.year || !selectedVehicle.engineType) {
    return (
      <Empty 
        icon="Car"
        title="Select Your Vehicle"
        description="Choose your vehicle specifications above to see fluid recommendations"
      />
    );
  }

  if (fluids.length === 0) {
    return (
      <Empty 
        icon="Droplets"
        title="No Fluids Found"
        description="We couldn't find fluid data for this vehicle configuration. Please try a different selection."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Fluid Recommendations</h2>
        <p className="text-gray-600">
          Professional fluid specifications for your {selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fluids.map((fluid, index) => (
          <motion.div
            key={fluid.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FluidCard fluid={fluid} />
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-sm text-gray-500">
          Always consult your vehicle's owner manual for specific requirements. 
          These recommendations are based on manufacturer specifications.
        </p>
      </div>
    </div>
  );
};

export default FluidResults;