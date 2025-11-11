import { Cliente } from "../cliente";

export class ClienteCRUD {
  clientes: Cliente[] = [];

  create(cliente: Cliente): Cliente {
    this.clientes.push(cliente);
    return cliente;
  }

  read(uuid: string): Cliente | undefined {
    return this.clientes.find(c => c.uuid === uuid);
  }

  update(uuid: string, nuevoCliente: Cliente): Cliente | undefined {
    const index = this.clientes.findIndex(c => c.uuid === uuid);
    if (index === -1) return undefined;

    this.clientes[index] = nuevoCliente;
    return nuevoCliente;
  }

  delete(uuid: string): boolean {
    const index = this.clientes.findIndex(c => c.uuid === uuid);
    if (index === -1) return false;

    this.clientes.splice(index, 1);
    return true;
  }
}