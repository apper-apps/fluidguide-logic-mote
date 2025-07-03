import fluidData from '@/services/mockData/fluids.json';

class FluidService {
  constructor() {
    this.fluids = fluidData;
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return this.fluids.map(fluid => ({ ...fluid }));
  }

  async getById(id) {
    await this.delay();
    const fluid = this.fluids.find(f => f.Id === id);
    return fluid ? { ...fluid } : null;
  }

  async getByVehicleId(vehicleId) {
    await this.delay();
    const vehicleFluids = this.fluids.filter(f => f.vehicleId === vehicleId);
    return vehicleFluids.map(fluid => ({ ...fluid }));
  }

  async getByType(type) {
    await this.delay();
    const typeFluids = this.fluids.filter(f => f.type === type);
    return typeFluids.map(fluid => ({ ...fluid }));
  }

  async create(fluidData) {
    await this.delay();
    const newId = Math.max(...this.fluids.map(f => f.Id)) + 1;
    const newFluid = {
      Id: newId,
      ...fluidData
    };
    this.fluids.push(newFluid);
    return { ...newFluid };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.fluids.findIndex(f => f.Id === id);
    if (index !== -1) {
      this.fluids[index] = { ...this.fluids[index], ...updates };
      return { ...this.fluids[index] };
    }
    return null;
  }

  async delete(id) {
    await this.delay();
    const index = this.fluids.findIndex(f => f.Id === id);
    if (index !== -1) {
      const deleted = this.fluids.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
}

export const fluidService = new FluidService();