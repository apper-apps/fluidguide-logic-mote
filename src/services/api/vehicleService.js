import vehicleData from '@/services/mockData/vehicles.json';

class VehicleService {
  constructor() {
    this.vehicles = vehicleData;
  }

  // Add delay to simulate API call
  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getBrands() {
    await this.delay();
    const brands = [...new Set(this.vehicles.map(v => v.brand))].sort();
    return brands;
  }

  async getModels(brand) {
    await this.delay();
    const models = [...new Set(
      this.vehicles
        .filter(v => v.brand === brand)
        .map(v => v.model)
    )].sort();
    return models;
  }

  async getYears(brand, model) {
    await this.delay();
    const years = [...new Set(
      this.vehicles
        .filter(v => v.brand === brand && v.model === model)
        .map(v => v.year)
    )].sort((a, b) => b - a);
    return years;
  }

  async getEngineTypes(brand, model, year) {
    await this.delay();
    const engineTypes = [...new Set(
      this.vehicles
        .filter(v => v.brand === brand && v.model === model && v.year === year)
        .map(v => v.engineType)
    )].sort();
    return engineTypes;
  }

  async getBySpecs(brand, model, year, engineType) {
    await this.delay();
    const vehicle = this.vehicles.find(v => 
      v.brand === brand && 
      v.model === model && 
      v.year === year && 
      v.engineType === engineType
    );
    return vehicle ? { ...vehicle } : null;
  }

  async getById(id) {
    await this.delay();
    const vehicle = this.vehicles.find(v => v.Id === id);
    return vehicle ? { ...vehicle } : null;
  }

  // Recent vehicles management
  getRecentVehicles() {
    const recent = localStorage.getItem('recentVehicles');
    return recent ? JSON.parse(recent) : [];
  }

  addRecentVehicle(vehicle) {
    let recent = this.getRecentVehicles();
    
    // Remove if already exists
    recent = recent.filter(v => 
      !(v.brand === vehicle.brand && 
        v.model === vehicle.model && 
        v.year === vehicle.year && 
        v.engineType === vehicle.engineType)
    );
    
    // Add to beginning
    recent.unshift(vehicle);
    
    // Keep only last 5
    recent = recent.slice(0, 5);
    
    localStorage.setItem('recentVehicles', JSON.stringify(recent));
    return recent;
  }

  clearRecentVehicles() {
    localStorage.removeItem('recentVehicles');
  }
}

export const vehicleService = new VehicleService();