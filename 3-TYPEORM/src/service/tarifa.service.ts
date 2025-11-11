import { DataSource } from "typeorm";
import { Tarifa } from "../entity/tarifa";
import { Tipo_vehiculo } from "../entity/tipo_vehiculo";

export class TarifaService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Tarifa);
  }

  // Crear una tarifa
  async create(data: Partial<Tarifa>): Promise<Tarifa> {
    const tarifa = this.repo.create(data);
    return await this.repo.save(tarifa);
  }

  // Obtener todas las tarifas
  async findAll(): Promise<Tarifa[]> {
    return await this.repo.find({ relations: ["tipoVehiculo"] });
  }

  // Obtener una tarifa por ID
  async findOne(id: number): Promise<Tarifa | null> {
    return await this.repo.findOne({
      where: { id_tarifa: id },
      relations: ["tipoVehiculo"]
    });
  }

  // Actualizar una tarifa
  async update(id: number, data: Partial<Tarifa>): Promise<Tarifa | null> {
    const tarifa = await this.repo.findOne({ where: { id_tarifa: id } });
    if (!tarifa) return null;
    this.repo.merge(tarifa, data);
    return await this.repo.save(tarifa);
  }

  // Eliminar una tarifa
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
