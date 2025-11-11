import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Espacio } from "./espacio";

@Entity()
export class Seccion {
  @PrimaryGeneratedColumn()
  id_seccion!: number; // PK

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 200 })
  descripcion!: string;

  // Relación OneToMany con Espacio
  @OneToMany(() => Espacio, espacio => espacio.seccion)
  espacios!: Espacio[];
}
