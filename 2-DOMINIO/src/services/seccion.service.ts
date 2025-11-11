import { Seccion } from "../seccion";

export class SeccionCRUD {
  secciones: Seccion[] = [];

  create(seccion: Seccion): Seccion {
    this.secciones.push(seccion);
    return seccion;
  }

  read(uuid: string): Seccion | undefined {
    return this.secciones.find(s => s.uuid === uuid);
  }

  update(uuid: string, nuevaSeccion: Seccion): Seccion | undefined {
    const index = this.secciones.findIndex(s => s.uuid === uuid);
    if (index === -1) return undefined;

    this.secciones[index] = nuevaSeccion;
    return nuevaSeccion;
  }

  delete(uuid: string): boolean {
    const index = this.secciones.findIndex(s => s.uuid === uuid);
    if (index === -1) return false;

    this.secciones.splice(index, 1);
    return true;
  }
}