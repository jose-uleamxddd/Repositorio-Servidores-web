import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Ticket } from "./ticket";
import { Seccion } from "./seccion";

@Entity()
export class Espacio {
  @PrimaryGeneratedColumn()
  id_espacio!: number;

  @Column()
  numero!: number;

  @Column()
  disponible!: boolean;

  // Relación ManyToOne con Seccion
  @ManyToOne(() => Seccion, seccion => seccion.espacios)
  seccion!: Seccion;

  @OneToOne(() => Ticket, ticket => ticket.espacio)
  ticket!: Ticket;
}
