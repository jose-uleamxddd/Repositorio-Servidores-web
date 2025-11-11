import { Vehiculo } from "../vehiculo";

export class VehiculoCRUD {
  vehiculos: Vehiculo[] = [];

  create(vehiculo: Vehiculo): Vehiculo {
    this.vehiculos.push(vehiculo);
    return vehiculo;
  }

  read(uuid: string): Vehiculo | undefined {
    return this.vehiculos.find(v => v.uuid === uuid);
  }

  update(uuid: string, nuevoVehiculo: Vehiculo): Vehiculo | undefined {
    const index = this.vehiculos.findIndex(v => v.uuid === uuid);
    if (index === -1) return undefined;

    this.vehiculos[index] = nuevoVehiculo;
    return nuevoVehiculo;
  }

  delete(uuid: string): boolean {
    const index = this.vehiculos.findIndex(v => v.uuid === uuid);
    if (index === -1) return false;

    this.vehiculos.splice(index, 1);
    return true;
  }
  static throwError(){
    console.log('Datos incorrectos, el objeto esta mal construido o le f')
  }
}