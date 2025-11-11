import { DataSource } from "typeorm";
import { Multa } from "../entity/multa";
import { TipoDeMulta } from "../entity/tipo_multa";

export class MultaService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Multa);
  }

  // Crear una multa
  async create(data: Partial<Multa>): Promise<Multa> {
    const multa = this.repo.create(data);
    return await this.repo.save(multa);
  }

  // Obtener todas las multas
  async findAll(): Promise<Multa[]> {
    return await this.repo.find({ relations: ["tipoDeMulta"] });
  }

  // Obtener una multa por ID
  async findOne(id: number): Promise<Multa | null> {
    return await this.repo.findOne({
      where: { id_multa: id },
      relations: ["tipoDeMulta"]
    });
  }

  // Actualizar una multa
  async update(id: number, data: Partial<Multa>): Promise<Multa | null> {
    const multa = await this.repo.findOne({ where: { id_multa: id } });
    if (!multa) return null;
    this.repo.merge(multa, data);
    return await this.repo.save(multa);
  }

  // Eliminar una multa
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
