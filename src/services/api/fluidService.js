import { toast } from 'react-toastify';

class FluidService {
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

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "specification" } },
          { field: { Name: "volume" } },
          { 
            field: { name: "vehicle" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "type", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('fluid', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching fluids:', error);
      toast.error('Failed to load fluids');
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "specification" } },
          { field: { Name: "volume" } },
          { 
            field: { name: "vehicle" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await this.apperClient.getRecordById('fluid', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error('Error fetching fluid by ID:', error);
      toast.error('Failed to load fluid data');
      return null;
    }
  }

  async getByVehicleId(vehicleId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "specification" } },
          { field: { Name: "volume" } },
          { 
            field: { name: "vehicle" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          { FieldName: "vehicle", Operator: "EqualTo", Values: [vehicleId] }
        ],
        orderBy: [
          { fieldName: "type", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('fluid', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      // Add mock products for display since products are embedded in original structure
      const fluidsWithProducts = (response.data || []).map(fluid => ({
        ...fluid,
        products: this.generateMockProducts(fluid)
      }));
      
      return fluidsWithProducts;
    } catch (error) {
      console.error('Error fetching fluids by vehicle ID:', error);
      toast.error('Failed to load fluid data');
      return [];
    }
  }

  async getByType(type) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "specification" } },
          { field: { Name: "volume" } },
          { 
            field: { name: "vehicle" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          { FieldName: "type", Operator: "EqualTo", Values: [type] }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('fluid', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching fluids by type:', error);
      toast.error('Failed to load fluid data');
      return [];
    }
  }

  async create(fluidData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Only include updateable fields
      const params = {
        records: [{
          Name: fluidData.Name,
          type: fluidData.type,
          specification: fluidData.specification,
          volume: fluidData.volume,
          vehicle: parseInt(fluidData.vehicle) // Ensure vehicle ID is integer
        }]
      };
      
      const response = await this.apperClient.createRecord('fluid', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          toast.success('Fluid created successfully');
          return result.data;
        } else {
          console.error(`Failed to create fluid:${JSON.stringify([result])}`);
          if (result.message) toast.error(result.message);
          return null;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error creating fluid:', error);
      toast.error('Failed to create fluid');
      return null;
    }
  }

  async update(id, updates) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Only include updateable fields
      const updateData = {
        Id: parseInt(id)
      };
      
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.type !== undefined) updateData.type = updates.type;
      if (updates.specification !== undefined) updateData.specification = updates.specification;
      if (updates.volume !== undefined) updateData.volume = updates.volume;
      if (updates.vehicle !== undefined) updateData.vehicle = parseInt(updates.vehicle);
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord('fluid', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          toast.success('Fluid updated successfully');
          return result.data;
        } else {
          console.error(`Failed to update fluid:${JSON.stringify([result])}`);
          if (result.message) toast.error(result.message);
          return null;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error updating fluid:', error);
      toast.error('Failed to update fluid');
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord('fluid', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          toast.success('Fluid deleted successfully');
          return true;
        } else {
          console.error(`Failed to delete fluid:${JSON.stringify([result])}`);
          if (result.message) toast.error(result.message);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting fluid:', error);
      toast.error('Failed to delete fluid');
      return false;
    }
  }

  // Helper method to generate mock products for display
  generateMockProducts(fluid) {
    const productTemplates = [
      {
        Id: Date.now() + Math.random(),
        name: `${fluid.type} - Premium Grade`,
        brand: "OEM",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
        purchaseUrl: "https://example.com/products",
        priority: 1
      },
      {
        Id: Date.now() + Math.random() + 1,
        name: `${fluid.type} - Standard Grade`,
        brand: "Aftermarket",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
        purchaseUrl: "https://example.com/products",
        priority: 2
      }
    ];
    
    return productTemplates;
  }
}

export const fluidService = new FluidService();