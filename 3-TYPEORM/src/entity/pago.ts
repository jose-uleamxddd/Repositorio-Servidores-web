import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { TipoDeTarifa } from "./tipo_tarifa";
import { Detalle_pago } from "./Detalle_pago";

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago!: number;

  @Column("float")
  monto!: number;

  @Column({ type: "datetime" })
  fecha_pago!: Date;

  @Column()
  metodo!: string;

  // Relación con TipoDeTarifa (1:1)
  @OneToOne(() => TipoDeTarifa)
  @JoinColumn({ name: "id_tipo_tarifa" })
  tipoTarifa!: TipoDeTarifa;

  // Relación con Detalle_pago (1:1)
  @OneToOne(() => Detalle_pago, detalle_pago => detalle_pago.pago)
  detalle_pago!: Detalle_pago;

  
}
