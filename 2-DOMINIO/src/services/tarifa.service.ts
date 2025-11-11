import { Tarifa } from "../tarifa";

export class TarifaCRUD {
  tarifas: Tarifa[] = [];

  create(tarifa: Tarifa): Tarifa {
    this.tarifas.push(tarifa);
    return tarifa;
  }

  read(uuid: string): Tarifa | undefined {
    return this.tarifas.find(t => t.uuid === uuid);
  }

  update(uuid: string, nuevaTarifa: Tarifa): Tarifa | undefined {
    const index = this.tarifas.findIndex(t => t.uuid === uuid);
    if (index === -1) return undefined;

    this.tarifas[index] = nuevaTarifa;
    return nuevaTarifa;
  }

  delete(uuid: string): boolean {
    const index = this.tarifas.findIndex(t => t.uuid === uuid);
    if (index === -1) return false;

    this.tarifas.splice(index, 1);
    return true;
  }
}