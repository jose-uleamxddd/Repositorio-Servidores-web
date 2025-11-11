import { DataSource } from "typeorm";
import { TipoDeMulta } from "../entity/tipo_multa";
import { Multa } from "../entity/multa";

export class TipoDeMultaService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(TipoDeMulta);
  }

  // Crear un tipo de multa
  async create(data: Partial<TipoDeMulta>): Promise<TipoDeMulta> {
    const tipo = this.repo.create(data);
    return await this.repo.save(tipo);
  }

  // Obtener todos los tipos de multa
  async findAll(): Promise<TipoDeMulta[]> {
    return await this.repo.find({ relations: ["multas"] });
  }

  // Obtener un tipo de multa por ID
  async findOne(id: number): Promise<TipoDeMulta | null> {
    return await this.repo.findOne({
      where: { id_tipoDeMulta: id },
      relations: ["multas"]
    });
  }

  // Actualizar un tipo de multa
  async update(id: number, data: Partial<TipoDeMulta>): Promise<TipoDeMulta | null> {
    const tipo = await this.repo.findOne({ where: { id_tipoDeMulta: id } });
    if (!tipo) return null;
    this.repo.merge(tipo, data);
    return await this.repo.save(tipo);
  }

  // Eliminar un tipo de multa
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
