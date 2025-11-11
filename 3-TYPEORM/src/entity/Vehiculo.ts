import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Ticket } from "./ticket";
import { Tipo_vehiculo } from "./tipo_vehiculo";
import { Cliente } from "./cliente";

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id_vehiculo!: number;

  @Column({ type: "varchar", length: 20 })
  placa!: string;

  @ManyToOne(() => Cliente, cliente => cliente.vehiculos)
  @JoinColumn({ name: "id_cliente" })
  cliente!: Cliente;

  @ManyToOne(() => Tipo_vehiculo, tipoVehiculo => tipoVehiculo.vehiculos)
  @JoinColumn({ name: "id_tipo_vehiculo" })
  tipoVehiculo!: Tipo_vehiculo;

  @OneToMany(() => Ticket, ticket => ticket.vehiculo)
  tickets!: Ticket[];
}
