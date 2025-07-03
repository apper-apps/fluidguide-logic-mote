import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import DropdownField from '@/components/molecules/DropdownField';
import { vehicleService } from '@/services/api/vehicleService';

const VehicleSelector = ({ onVehicleSelect, selectedVehicle }) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  
  const [selectedBrand, setSelectedBrand] = useState(selectedVehicle?.brand || '');
  const [selectedModel, setSelectedModel] = useState(selectedVehicle?.model || '');
  const [selectedYear, setSelectedYear] = useState(selectedVehicle?.year || '');
  const [selectedEngineType, setSelectedEngineType] = useState(selectedVehicle?.engineType || '');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      setSelectedBrand(selectedVehicle.brand || '');
      setSelectedModel(selectedVehicle.model || '');
      setSelectedYear(selectedVehicle.year || '');
      setSelectedEngineType(selectedVehicle.engineType || '');
      
      // Load dependent dropdowns
      if (selectedVehicle.brand) {
        loadModels(selectedVehicle.brand);
        if (selectedVehicle.model) {
          loadYears(selectedVehicle.brand, selectedVehicle.model);
          if (selectedVehicle.year) {
            loadEngineTypes(selectedVehicle.brand, selectedVehicle.model, selectedVehicle.year);
          }
        }
      }
    }
  }, [selectedVehicle]);

  const loadBrands = async () => {
    setLoading(true);
    try {
const brandsData = await vehicleService.getBrands();
      setBrands(brandsData || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadModels = async (brand) => {
    if (!brand) return;
    try {
const modelsData = await vehicleService.getModels(brand);
      setModels(modelsData || []);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const loadYears = async (brand, model) => {
    if (!brand || !model) return;
    try {
const yearsData = await vehicleService.getYears(brand, model);
      setYears(yearsData || []);
    } catch (error) {
      console.error('Error loading years:', error);
    }
  };

  const loadEngineTypes = async (brand, model, year) => {
    if (!brand || !model || !year) return;
    try {
const engineTypesData = await vehicleService.getEngineTypes(brand, model, year);
      setEngineTypes(engineTypesData || []);
    } catch (error) {
      console.error('Error loading engine types:', error);
    }
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedYear('');
    setSelectedEngineType('');
    setModels([]);
    setYears([]);
    setEngineTypes([]);
    
    if (brand) {
      loadModels(brand);
    }
    
    updateVehicleSelection(brand, '', '', '');
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedYear('');
    setSelectedEngineType('');
    setYears([]);
    setEngineTypes([]);
    
    if (model && selectedBrand) {
      loadYears(selectedBrand, model);
    }
    
    updateVehicleSelection(selectedBrand, model, '', '');
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedEngineType('');
    setEngineTypes([]);
    
    if (year && selectedBrand && selectedModel) {
      loadEngineTypes(selectedBrand, selectedModel, year);
    }
    
    updateVehicleSelection(selectedBrand, selectedModel, year, '');
  };

  const handleEngineTypeChange = (engineType) => {
    setSelectedEngineType(engineType);
    updateVehicleSelection(selectedBrand, selectedModel, selectedYear, engineType);
  };

  const updateVehicleSelection = (brand, model, year, engineType) => {
    const vehicle = {
      brand,
      model,
      year,
      engineType
    };
    onVehicleSelect(vehicle);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select Your Vehicle</h2>
        <p className="text-gray-600">Choose your vehicle specifications to get accurate fluid recommendations</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DropdownField
            label="Brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            options={brands}
            placeholder="Select Brand"
            loading={loading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DropdownField
            label="Model"
            value={selectedModel}
            onChange={handleModelChange}
            options={models}
            placeholder="Select Model"
            disabled={!selectedBrand}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DropdownField
            label="Year"
            value={selectedYear}
            onChange={handleYearChange}
            options={years}
            placeholder="Select Year"
            disabled={!selectedModel}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DropdownField
            label="Engine Type"
            value={selectedEngineType}
            onChange={handleEngineTypeChange}
            options={engineTypes}
            placeholder="Select Engine"
            disabled={!selectedYear}
          />
        </motion.div>
      </div>

      {selectedBrand && selectedModel && selectedYear && selectedEngineType && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Vehicle</h3>
          <p className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {selectedBrand} {selectedModel} {selectedYear} • {selectedEngineType}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default VehicleSelector;