import { DataSource } from "typeorm";
import { Tipo_vehiculo } from "../entity/tipo_vehiculo";
import { Vehiculo } from "../entity/Vehiculo";
import { Tarifa } from "../entity/tarifa";

export class TipoVehiculoService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Tipo_vehiculo);
  }

  // Crear un tipo de vehículo
  async create(data: Partial<Tipo_vehiculo>): Promise<Tipo_vehiculo> {
    const tipo = this.repo.create(data);
    return await this.repo.save(tipo);
  }

  // Obtener todos los tipos de vehículo
  async findAll(): Promise<Tipo_vehiculo[]> {
    return await this.repo.find({ relations: ["vehiculos", "tarifa"] });
  }

  // Obtener un tipo de vehículo por ID
  async findOne(id: number): Promise<Tipo_vehiculo | null> {
    return await this.repo.findOne({
      where: { id_tipoVehiculo: id },
      relations: ["vehiculos", "tarifa"]
    });
  }

  // Actualizar un tipo de vehículo
  async update(id: number, data: Partial<Tipo_vehiculo>): Promise<Tipo_vehiculo | null> {
    const tipo = await this.repo.findOne({ where: { id_tipoVehiculo: id } });
    if (!tipo) return null;
    this.repo.merge(tipo, data);
    return await this.repo.save(tipo);
  }

  // Eliminar un tipo de vehículo
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
