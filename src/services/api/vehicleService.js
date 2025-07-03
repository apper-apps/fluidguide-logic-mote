import { toast } from 'react-toastify';

class VehicleService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getBrands() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "brand" } }
        ],
        groupBy: ["brand"],
        orderBy: [
          { fieldName: "brand", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('vehicle', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      const brands = [...new Set(response.data.map(v => v.brand))].sort();
      return brands;
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to load brands');
      return [];
    }
  }

  async getModels(brand) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "model" } }
        ],
        where: [
          { FieldName: "brand", Operator: "EqualTo", Values: [brand] }
        ],
        groupBy: ["model"],
        orderBy: [
          { fieldName: "model", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('vehicle', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      const models = [...new Set(response.data.map(v => v.model))].sort();
      return models;
    } catch (error) {
      console.error('Error fetching models:', error);
      toast.error('Failed to load models');
      return [];
    }
  }

  async getYears(brand, model) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "year" } }
        ],
        where: [
          { FieldName: "brand", Operator: "EqualTo", Values: [brand] },
          { FieldName: "model", Operator: "EqualTo", Values: [model] }
        ],
        groupBy: ["year"],
        orderBy: [
          { fieldName: "year", sorttype: "DESC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('vehicle', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      const years = [...new Set(response.data.map(v => v.year))].sort((a, b) => b - a);
      return years;
    } catch (error) {
      console.error('Error fetching years:', error);
      toast.error('Failed to load years');
      return [];
    }
  }

  async getEngineTypes(brand, model, year) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "engine_type" } }
        ],
        where: [
          { FieldName: "brand", Operator: "EqualTo", Values: [brand] },
          { FieldName: "model", Operator: "EqualTo", Values: [model] },
          { FieldName: "year", Operator: "EqualTo", Values: [year] }
        ],
        groupBy: ["engine_type"],
        orderBy: [
          { fieldName: "engine_type", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('vehicle', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      const engineTypes = [...new Set(response.data.map(v => v.engine_type))].sort();
      return engineTypes;
    } catch (error) {
      console.error('Error fetching engine types:', error);
      toast.error('Failed to load engine types');
      return [];
    }
  }

  async getBySpecs(brand, model, year, engineType) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "model" } },
          { field: { Name: "year" } },
          { field: { Name: "engine_type" } },
          { field: { Name: "engine_code" } }
        ],
        where: [
          { FieldName: "brand", Operator: "EqualTo", Values: [brand] },
          { FieldName: "model", Operator: "EqualTo", Values: [model] },
          { FieldName: "year", Operator: "EqualTo", Values: [year] },
          { FieldName: "engine_type", Operator: "EqualTo", Values: [engineType] }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('vehicle', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error('Error fetching vehicle by specs:', error);
      toast.error('Failed to load vehicle data');
      return null;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "model" } },
          { field: { Name: "year" } },
          { field: { Name: "engine_type" } },
          { field: { Name: "engine_code" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('vehicle', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error('Error fetching vehicle by ID:', error);
      toast.error('Failed to load vehicle data');
      return null;
    }
  }

  // Recent vehicles management (preserved as localStorage for UI state)
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