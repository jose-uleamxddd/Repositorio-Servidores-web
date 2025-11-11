import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Tarifa } from "./tarifa";
import { Vehiculo } from "./Vehiculo";

@Entity()
export class Tipo_vehiculo {
  @PrimaryGeneratedColumn()
  id_tipoVehiculo!: number;

  @Column()
  categoria!: string;

  @Column()
  descripcion!: string;

  @OneToOne(() => Tarifa, tarifa => tarifa.tipoVehiculo)
  tarifa!: Tarifa;

  @OneToMany(() => Vehiculo, vehiculo => vehiculo.tipoVehiculo)
  vehiculos!: Vehiculo[];
}
