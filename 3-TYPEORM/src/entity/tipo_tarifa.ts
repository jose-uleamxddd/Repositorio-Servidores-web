import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Pago } from "./pago";

@Entity()
export class TipoDeTarifa {
    @PrimaryGeneratedColumn()
    id_tipo_tarifa!: number;

    @Column({ type: "varchar" })
    tipo_tarifa!: string;

    @Column("float")
    precio_hora!: number;

    @Column("float")
    precio_dia!: number;

    // Relación con Pago (1:1)
    @OneToOne(() => Pago, pago => pago.tipoTarifa)
    pago!: Pago;
}