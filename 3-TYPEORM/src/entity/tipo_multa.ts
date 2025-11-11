import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Multa } from "./multa";

@Entity()
export class TipoDeMulta {
  @PrimaryGeneratedColumn()
  id_tipoDeMulta!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column("float")
  monto!: number;

  @OneToMany(() => Multa, (multa) => multa.tipoDeMulta)
  multas!: Multa[];
}
