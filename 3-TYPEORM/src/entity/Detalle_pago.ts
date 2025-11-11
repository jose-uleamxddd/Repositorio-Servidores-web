import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Pago } from "./pago";
import { Ticket } from "./ticket";
import { Multa } from "./multa";

@Entity()
export class Detalle_pago {
  @PrimaryGeneratedColumn()
  id_detalle_pago!: number;

  @Column("datetime")
  fecha_pago!: Date;

  @Column({ type: "varchar", length: 100 })
  metodo!: string;

  @Column("datetime")
  fecha_salida!: Date;

  @Column("float")
  pago_total!: number;

  // Relación uno a uno con Pago
  @OneToOne(() => Pago)
  @JoinColumn({ name: "id_pago" })
  pago!: Pago;

  // Relación uno a uno con Ticket
  @OneToOne(() => Ticket)
  @JoinColumn({ name: "id_ticket" })
  ticket!: Ticket;

  // Relación uno a uno con Multa
  @ManyToOne(() => Multa)
  @JoinColumn({ name: "id_multa" })
  multa?: Multa;
}
