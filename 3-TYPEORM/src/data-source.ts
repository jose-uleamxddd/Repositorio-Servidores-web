import "reflect-metadata";
import { DataSource } from "typeorm";
import { Detalle_pago } from "./entity/Detalle_pago";
import { Ticket } from "./entity/ticket";
import { Vehiculo } from "./entity/Vehiculo";
import { Multa } from "./entity/multa";
import { TipoDeMulta } from "./entity/tipo_multa";
import { Tipo_vehiculo } from "./entity/tipo_vehiculo";
import { Tarifa } from "./entity/tarifa";
import { Cliente } from "./entity/cliente";
import { Espacio } from "./entity/espacio";
import { Pago } from "./entity/pago";
import { Seccion } from "./entity/seccion";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true, // crea las tablas automáticamente
    logging: true,
    entities: [Detalle_pago,Ticket,Vehiculo,Multa,TipoDeMulta,Tipo_vehiculo,Tarifa,Cliente,Espacio,Pago,Seccion],
    migrations:[],
    subscribers:[]
});
