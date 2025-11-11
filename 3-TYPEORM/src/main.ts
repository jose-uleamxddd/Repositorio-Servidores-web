import "reflect-metadata";
import { Cliente } from "./entity/cliente";
import { Vehiculo } from "./entity/Vehiculo";
import { Tipo_vehiculo } from "./entity/tipo_vehiculo";
import { Tarifa } from "./entity/tarifa";
import { Seccion } from "./entity/seccion";
import { Espacio } from "./entity/espacio";
import { Ticket } from "./entity/ticket";
import { Pago } from "./entity/pago";
import { Detalle_pago } from "./entity/Detalle_pago";
import { Multa } from "./entity/multa";
import { TipoDeMulta } from "./entity/tipo_multa";
import { AppDataSource } from "./data-source";

async function seed() {
  await AppDataSource.initialize();
  console.log("Base de datos conectada ✅");

  
  const clienteRepo = AppDataSource.getRepository(Cliente);
  const tipoVehiculoRepo = AppDataSource.getRepository(Tipo_vehiculo);
  const tarifaRepo = AppDataSource.getRepository(Tarifa);
  const vehiculoRepo = AppDataSource.getRepository(Vehiculo);
  const seccionRepo = AppDataSource.getRepository(Seccion);
  const espacioRepo = AppDataSource.getRepository(Espacio);
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const pagoRepo = AppDataSource.getRepository(Pago);
  const detallePagoRepo = AppDataSource.getRepository(Detalle_pago);
  const tipoMultaRepo = AppDataSource.getRepository(TipoDeMulta);
  const multaRepo = AppDataSource.getRepository(Multa);

  
  const seccion1 = await seccionRepo.save({ nombre: "Seccion A", descripcion: "Zona principal" });
  const espacio1 = await espacioRepo.save({ numero: 1, disponible: true, seccion: seccion1 });
  const espacio2 = await espacioRepo.save({ numero: 2, disponible: true, seccion: seccion1 });


  const tipoAuto = await tipoVehiculoRepo.save({ categoria: "Auto", descripcion: "Vehículo pequeño" });
  const tarifaAuto = await tarifaRepo.save({ tipo_tarifa: "Hora", precio_hora: 2, precio_dia: 20, tipoVehiculo: tipoAuto });

 
  tipoAuto.tarifa = tarifaAuto;
  await tipoVehiculoRepo.save(tipoAuto);

 
  const cliente1 = await clienteRepo.save({ nombre: "Juan Perez", cedula: "1234567890", celular: "0999999999" });
  const vehiculo1 = await vehiculoRepo.save({ 
    placa: "ABC-1234", 
    cliente: cliente1,
    tipoVehiculo: tipoAuto
  });

  const ticket1 = await ticketRepo.save({ fecha_entrada: new Date(), vehiculo: vehiculo1, espacio: espacio1 });

 
  const pago1 = await pagoRepo.save({ monto: 10, fecha_pago: new Date(), metodo: "Efectivo", tarifa: tarifaAuto });
  const detalle1 = await detallePagoRepo.save({ fecha_pago: new Date(), fecha_salida: new Date(), metodo: "Efectivo", pago_total: 10, pago: pago1, ticket: ticket1 });

 
  const tipoMulta1 = await tipoMultaRepo.save({ nombre: "Estacionamiento indebido", monto: 5 });
  const multa1 = await multaRepo.save({ descripcion: "Mal estacionamiento", monto_total: 5, tipoDeMulta: tipoMulta1 });


  await detallePagoRepo.save(detalle1);

  console.log("Seed completado ✅");
  await AppDataSource.destroy();
}

seed().catch(err => console.error(err));
