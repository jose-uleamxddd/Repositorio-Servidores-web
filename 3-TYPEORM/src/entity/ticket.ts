import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { Espacio } from "./espacio";
import { Detalle_pago } from "./Detalle_pago";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id_ticket!: number;

  @Column("datetime")
  fecha_entrada!: Date;

  // Relación ManyToOne con Vehiculo (n:1)
  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.tickets)
  @JoinColumn({ name: "id_vehiculo" })
  vehiculo!: Vehiculo;

  // Relación con Espacio (1:1)
  @OneToOne(() => Espacio)
  @JoinColumn({ name: "id_espacio" })
  espacio!: Espacio;

  // Relación con Detalle_pago (1:1)
  @OneToOne(() => Detalle_pago, detalle_pago => detalle_pago.ticket)
  detalle_pago!: Detalle_pago;
}
