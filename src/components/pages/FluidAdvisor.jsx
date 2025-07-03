import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Car, Filter, Info, Search, Settings } from "lucide-react";
import VehicleSelector from "@/components/organisms/VehicleSelector";
import FluidResults from "@/components/organisms/FluidResults";
import SearchBar from "@/components/molecules/SearchBar";
import vehicleData from "@/services/mockData/vehicles.json";
import fluidData from "@/services/mockData/fluids.json";
import { fluidService } from "@/services/api/fluidService";
import { vehicleService } from "@/services/api/vehicleService";
const FluidAdvisor = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fluids, setFluids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Listen for recent vehicle selection
    const handleRecentVehicleSelect = (event) => {
      const vehicle = event.detail;
      setSelectedVehicle(vehicle);
      loadFluids(vehicle);
    };

    window.addEventListener('selectRecentVehicle', handleRecentVehicleSelect);
    return () => window.removeEventListener('selectRecentVehicle', handleRecentVehicleSelect);
  }, []);

  const handleVehicleSelect = async (vehicle) => {
    setSelectedVehicle(vehicle);
    setFluids([]);
    
    if (vehicle.brand && vehicle.model && vehicle.year && vehicle.engineType) {
      await loadFluids(vehicle);
      
      // Save to recent vehicles
vehicleService.addRecentVehicle(vehicle);
      
      // Refresh sidebar
      if (typeof CustomEvent !== 'undefined') {
        window.dispatchEvent(new CustomEvent('refreshSidebar'));
      } else {
        // Fallback for older browsers
        const event = document.createEvent('CustomEvent');
        event.initCustomEvent('refreshSidebar', false, false, null);
        window.dispatchEvent(event);
      }
      
      toast.success(`Loaded fluids for ${vehicle.brand} ${vehicle.model} ${vehicle.year}`);
    }
  };

  const loadFluids = async (vehicle) => {
    setLoading(true);
    try {
      const vehicleData = await vehicleService.getBySpecs(
        vehicle.brand, 
        vehicle.model, 
        vehicle.year, 
        vehicle.engineType
      );
      
      if (vehicleData) {
        const fluidData = await fluidService.getByVehicleId(vehicleData.Id);
        setFluids(fluidData);
      }
    } catch (error) {
      toast.error('Failed to load fluid data');
      console.error('Error loading fluids:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter fluids based on search query
    // This would typically search through vehicle database
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
          FluidGuide Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find the exact fluids your vehicle needs with professional recommendations and direct purchase links
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      {/* Vehicle Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200"
      >
        <VehicleSelector onVehicleSelect={handleVehicleSelect} selectedVehicle={selectedVehicle} />
      </motion.div>

      {/* Results Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FluidResults 
          fluids={fluids} 
          loading={loading} 
          selectedVehicle={selectedVehicle}
        />
      </motion.div>

      {/* Info Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
>
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Settings className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Data</h3>
          <p className="text-gray-600 text-sm">Accurate specifications from automotive manufacturers</p>
        </div>
<div className="bg-gradient-to-br from-success/10 to-info/10 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Search className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Direct Purchase</h3>
          <p className="text-gray-600 text-sm">Links to trusted automotive parts suppliers</p>
        </div>
<div className="bg-gradient-to-br from-warning/10 to-error/10 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mx-auto mb-4">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3 }}>
              <Info className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Access</h3>
          <p className="text-gray-600 text-sm">Recently viewed vehicles for easy reference</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FluidAdvisor;