import { VehiculoCliente } from "../vehiculo-cliente";

export class VehiculoClienteCRUD {
  vehiculosCliente: VehiculoCliente[] = [];

  create(vc: VehiculoCliente): VehiculoCliente {
    this.vehiculosCliente.push(vc);
    return vc;
  }

  read(uuid: string): VehiculoCliente | undefined {
    return this.vehiculosCliente.find(v => v.uuid === uuid);
  }

  update(uuid: string, nuevoVC: VehiculoCliente): VehiculoCliente | undefined {
    const index = this.vehiculosCliente.findIndex(v => v.uuid === uuid);
    if (index === -1) return undefined;

    this.vehiculosCliente[index] = nuevoVC;
    return nuevoVC;
  }

  delete(uuid: string): boolean {
    const index = this.vehiculosCliente.findIndex(v => v.uuid === uuid);
    if (index === -1) return false;

    this.vehiculosCliente.splice(index, 1);
    return true;
  }
}