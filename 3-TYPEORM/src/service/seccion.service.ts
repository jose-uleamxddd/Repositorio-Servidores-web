import { DataSource } from "typeorm";
import { Seccion } from "../entity/seccion";
import { Espacio } from "../entity/espacio";

export class SeccionService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Seccion);
  }

  // Crear una sección
  async create(data: Partial<Seccion>): Promise<Seccion> {
    const seccion = this.repo.create(data);
    return await this.repo.save(seccion);
  }

  // Obtener todas las secciones
  async findAll(): Promise<Seccion[]> {
    return await this.repo.find({ relations: ["espacios"] });
  }

  // Obtener una sección por ID
  async findOne(id: number): Promise<Seccion | null> {
    return await this.repo.findOne({
      where: { id_seccion: id },
      relations: ["espacios"]
    });
  }

  // Actualizar una sección
  async update(id: number, data: Partial<Seccion>): Promise<Seccion | null> {
    const seccion = await this.repo.findOne({ where: { id_seccion: id } });
    if (!seccion) return null;
    this.repo.merge(seccion, data);
    return await this.repo.save(seccion);
  }

  // Eliminar una sección
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
