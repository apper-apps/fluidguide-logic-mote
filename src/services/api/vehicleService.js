import { toast } from 'react-toastify';

class VehicleService {
  constructor() {
    this.apperClient = null;
  }
  initializeClient() {
    if (typeof window === 'undefined') {
      console.error('ApperClient can only be initialized in browser environment');
      return;
    }
    
    if (!window.ApperSDK) {
      console.error('ApperSDK not found. Make sure the Apper SDK script is loaded.');
      toast.error('Service configuration error. Please contact support.');
      return;
    }
    
    const projectId = import.meta.env.VITE_APPER_PROJECT_ID;
    const publicKey = import.meta.env.VITE_APPER_PUBLIC_KEY;
    
    if (!projectId || !publicKey) {
      console.error('Missing required environment variables: VITE_APPER_PROJECT_ID and/or VITE_APPER_PUBLIC_KEY');
      toast.error('Service configuration missing. Please contact support.');
      return;
    }
    
    try {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: projectId,
        apperPublicKey: publicKey
      });
      console.log('ApperClient initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ApperClient:', error);
      toast.error('Failed to initialize service connection.');
    }
  }

  async getBrands() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
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
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
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
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
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
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
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
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
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
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
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

  // Local storage methods for recent vehicles
  getRecentVehicles() {
    try {
      const stored = localStorage.getItem('recentVehicles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  addRecentVehicle(vehicle) {
    try {
      const recent = this.getRecentVehicles();
      const filtered = recent.filter(v => 
        !(v.brand === vehicle.brand && v.model === vehicle.model && 
          v.year === vehicle.year && v.engineType === vehicle.engineType)
      );
      filtered.unshift(vehicle);
      const limited = filtered.slice(0, 5);
      localStorage.setItem('recentVehicles', JSON.stringify(limited));
    } catch (error) {
      console.error('Error saving recent vehicle:', error);
    }
  }

  clearRecentVehicles() {
    try {
      localStorage.removeItem('recentVehicles');
    } catch (error) {
      console.error('Error clearing recent vehicles:', error);
    }
  }
}

export const vehicleService = new VehicleService();