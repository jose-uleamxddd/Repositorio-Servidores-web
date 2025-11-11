import { Injectable } from '@angular/core';

export interface Vehicle {
  id: number;
  licensePlate: string;
  owner: string;
  vehicleType: string;
  entryTime: Date;
  exitTime?: Date;
  parkingSpot: number;
  fee?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Parking {
  private vehicles: Vehicle[] = [];
  private history: Vehicle[] = [];
  private nextId = 1;
  private readonly hourlyRate = 2; // $2 por hora

  constructor() {
    this.loadFromLocalStorage();
  }

  // Registrar entrada de vehículo
  registerVehicle(vehicle: Omit<Vehicle, 'id' | 'entryTime'>): Vehicle {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: this.nextId++,
      entryTime: new Date()
    };
    this.vehicles.push(newVehicle);
    this.saveToLocalStorage();
    return newVehicle;
  }

  // Obtener vehículos estacionados
  getParkedVehicles(): Vehicle[] {
    return this.vehicles;
  }

  // Registrar salida de vehículo
  exitVehicle(id: number): Vehicle | undefined {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index !== -1) {
      const vehicle = this.vehicles[index];
      vehicle.exitTime = new Date();
      vehicle.fee = this.calculateFee(vehicle.entryTime, vehicle.exitTime);
      
      this.history.push(vehicle);
      this.vehicles.splice(index, 1);
      this.saveToLocalStorage();
      return vehicle;
    }
    return undefined;
  }

  // Obtener historial
  getHistory(): Vehicle[] {
    return this.history;
  }

  // Calcular tarifa
  private calculateFee(entryTime: Date, exitTime: Date): number {
    const hours = Math.ceil((exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60));
    return hours * this.hourlyRate;
  }

  // Obtener estadísticas
  getStatistics() {
    return {
      currentVehicles: this.vehicles.length,
      totalVehicles: this.history.length + this.vehicles.length,
      availableSpots: 50 - this.vehicles.length,
      totalRevenue: this.history.reduce((sum, v) => sum + (v.fee || 0), 0)
    };
  }

  // Guardar en localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('parkedVehicles', JSON.stringify(this.vehicles));
    localStorage.setItem('vehicleHistory', JSON.stringify(this.history));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  // Cargar desde localStorage
  private loadFromLocalStorage(): void {
    const parked = localStorage.getItem('parkedVehicles');
    const hist = localStorage.getItem('vehicleHistory');
    const id = localStorage.getItem('nextId');

    if (parked) {
      this.vehicles = JSON.parse(parked).map((v: any) => ({
        ...v,
        entryTime: new Date(v.entryTime),
        exitTime: v.exitTime ? new Date(v.exitTime) : undefined
      }));
    }

    if (hist) {
      this.history = JSON.parse(hist).map((v: any) => ({
        ...v,
        entryTime: new Date(v.entryTime),
        exitTime: v.exitTime ? new Date(v.exitTime) : undefined
      }));
    }

    if (id) {
      this.nextId = parseInt(id);
    }
  }
}
