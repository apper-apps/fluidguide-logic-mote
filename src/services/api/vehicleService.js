import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

class VehicleService {
  tableName = 'vehicle';
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

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch brands:', response.message);
        toast.error(response.message || 'Failed to load vehicle brands');
        return [];
      }

      const brands = response.data?.map(item => item.brand).filter(Boolean) || [];
      return [...new Set(brands)].sort();
    } catch (error) {
      console.error('Error fetching brands:', error);
      
      if (error.name === 'AxiosError' || error.message?.includes('Network Error')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to load vehicle brands. Please try again.');
      }
      
      return [];
    }
  }

// Get models for a specific brand
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

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch models:', response.message);
        toast.error(response.message || 'Failed to load vehicle models');
        return [];
      }

      const models = response.data?.map(item => item.model).filter(Boolean) || [];
      return [...new Set(models)].sort();
    } catch (error) {
      console.error('Error fetching models:', error);
      
      if (error.name === 'AxiosError' || error.message?.includes('Network Error')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to load vehicle models. Please try again.');
      }
      
      return [];
    }
  }

// Get years for a specific brand and model
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

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch years:', response.message);
        toast.error(response.message || 'Failed to load vehicle years');
        return [];
      }

      const years = response.data?.map(item => item.year).filter(Boolean) || [];
      return [...new Set(years)].sort((a, b) => b - a);
    } catch (error) {
      console.error('Error fetching years:', error);
      
      if (error.name === 'AxiosError' || error.message?.includes('Network Error')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to load vehicle years. Please try again.');
      }
      
      return [];
    }
  }

// Get engine types for a specific brand, model, and year
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

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch engine types:', response.message);
        toast.error(response.message || 'Failed to load engine types');
        return [];
      }

      const engineTypes = response.data?.map(item => item.engine_type).filter(Boolean) || [];
      return [...new Set(engineTypes)].sort();
    } catch (error) {
      console.error('Error fetching engine types:', error);
      
      if (error.name === 'AxiosError' || error.message?.includes('Network Error')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to load engine types. Please try again.');
      }
      
      return [];
    }
  }

// Get vehicles by specifications
  async getBySpecs(brand, model, year, engineType) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      if (!this.apperClient) {
        throw new Error('Failed to initialize ApperClient');
      }
      
      const whereConditions = [
        { FieldName: "brand", Operator: "EqualTo", Values: [brand] },
        { FieldName: "model", Operator: "EqualTo", Values: [model] },
        { FieldName: "year", Operator: "EqualTo", Values: [year] }
      ];

      if (engineType) {
        whereConditions.push({ FieldName: "engine_type", Operator: "EqualTo", Values: [engineType] });
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
        where: whereConditions
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch vehicles by specs:', response.message);
        toast.error(response.message || 'Failed to load vehicles');
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching vehicles by specs:', error);
      
      if (error.name === 'AxiosError' || error.message?.includes('Network Error')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to load vehicles. Please try again.');
      }
return [];
    }
  }

  // Get vehicle by ID
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

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error('Failed to fetch vehicle by ID:', response.message);
        toast.error(response.message || 'Failed to load vehicle details');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle by ID:', error);
      
      if (error.name === 'AxiosError' || error.message?.includes('Network Error')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to load vehicle details. Please try again.');
      }
      
      return null;
    }
  }

  // Recent vehicles localStorage management
  getRecentVehicles() {
    try {
      const recent = localStorage.getItem('recentVehicles');
      return recent ? JSON.parse(recent) : [];
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