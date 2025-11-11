import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { TipoDeMulta } from "./tipo_multa";
import { Detalle_pago } from "./Detalle_pago";

@Entity()
export class Multa {
  @PrimaryGeneratedColumn()
  id_multa!: number;

  @Column()
  descripcion!: string;

  @Column("float")
  monto_total!: number;

  @ManyToOne(() => TipoDeMulta, (tipoDeMulta) => tipoDeMulta.multas)
  @JoinColumn({ name: "id_tipoDeMulta" })
  tipoDeMulta!: TipoDeMulta;

  
}
