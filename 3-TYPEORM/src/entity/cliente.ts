import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  cedula!: string;

  @Column()
  celular!: string;

  // Relación OneToMany: un cliente tiene muchos vehículos
  @OneToMany(() => Vehiculo, vehiculo => vehiculo.cliente)
  
  
  vehiculos!: Vehiculo[];
}
