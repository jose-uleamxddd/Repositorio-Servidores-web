import { Seccion } from "./seccion"
import { Ticket } from "./ticket"
import { Vehiculo } from "./vehiculo"

export interface Cliente {
	uuid: string,
    nombre: string,
    email: string,
    cedula: string,
    telefono: string,
    vehiculos: string[],
    tickets: string[],

}