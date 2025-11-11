import { Administrador } from "../administrador";

export class AdministradorCRUD {
    private administradores: Administrador[] = [];

    create(admin: Administrador): void {
        this.administradores.push(admin);
    }

    read(uuid: string): Administrador | undefined {
        return this.administradores.find(a => a.uuid === uuid);
    }

    readAll(): Administrador[] {
        return this.administradores;
    }

    update(uuid: string, nuevoAdmin: Administrador): Administrador | undefined {
        const index = this.administradores.findIndex(a => a.uuid === uuid);
        if (index === -1) return undefined;

        this.administradores[index] = nuevoAdmin;
        return nuevoAdmin;
    }

    delete(uuid: string): void {
        this.administradores = this.administradores.filter(a => a.uuid !== uuid);
    }
}
