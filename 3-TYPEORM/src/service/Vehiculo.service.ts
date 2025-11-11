import { DataSource } from "typeorm";
import { Vehiculo } from "../entity/Vehiculo";
import { Cliente } from "../entity/cliente";
import { Tipo_vehiculo } from "../entity/tipo_vehiculo";

export class VehiculoService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Vehiculo);
  }

  async create(data: Partial<Vehiculo>): Promise<Vehiculo> {
    const vehiculo = this.repo.create(data);
    return await this.repo.save(vehiculo);
  }

  async findAll(): Promise<Vehiculo[]> {
    return await this.repo.find({ relations: ["cliente", "tipoVehiculo", "ticket"] });
  }

  async findOne(id: number): Promise<Vehiculo | null> {
    return await this.repo.findOne({
      where: { id_vehiculo: id },
      relations: ["cliente", "tipoVehiculo", "ticket"]
    });
  }

  async update(id: number, data: Partial<Vehiculo>): Promise<Vehiculo | null> {
    const vehiculo = await this.repo.findOne({ where: { id_vehiculo: id } });
    if (!vehiculo) return null;
    this.repo.merge(vehiculo, data);
    return await this.repo.save(vehiculo);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
