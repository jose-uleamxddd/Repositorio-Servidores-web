import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Pago } from "./pago";
import { Tipo_vehiculo } from "./tipo_vehiculo";
import { Detalle_pago } from "./Detalle_pago";

@Entity()
export class Tarifa {
  @PrimaryGeneratedColumn()
  id_tarifa!: number;

  @Column()
  tipo_tarifa!: string;

  @Column("float")
  precio_hora!: number;

  @Column("float")
  precio_dia!: number;

  @OneToOne(() => Tipo_vehiculo, (tipoVehiculo) => tipoVehiculo.tarifa)
  @JoinColumn({ name: "tipo_vehiculo_id" })
  tipoVehiculo!: Tipo_vehiculo;

}
