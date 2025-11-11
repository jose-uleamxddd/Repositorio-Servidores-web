import { DataSource } from "typeorm";
import { Espacio } from "../entity/espacio";
import { Seccion } from "../entity/seccion";
import { Ticket } from "../entity/ticket";

export class EspacioService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Espacio);
  }

  // Crear un espacio
  async create(data: Partial<Espacio>): Promise<Espacio> {
    const espacio = this.repo.create(data);
    return await this.repo.save(espacio);
  }

  // Obtener todos los espacios
  async findAll(): Promise<Espacio[]> {
    return await this.repo.find({ relations: ["seccion", "ticket"] });
  }

  // Obtener un espacio por ID
  async findOne(id: number): Promise<Espacio | null> {
    return await this.repo.findOne({
      where: { id_espacio: id },
      relations: ["seccion", "ticket"]
    });
  }

  // Actualizar un espacio
  async update(id: number, data: Partial<Espacio>): Promise<Espacio | null> {
    const espacio = await this.repo.findOne({ where: { id_espacio: id } });
    if (!espacio) return null;
    this.repo.merge(espacio, data);
    return await this.repo.save(espacio);
  }

  // Eliminar un espacio
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
