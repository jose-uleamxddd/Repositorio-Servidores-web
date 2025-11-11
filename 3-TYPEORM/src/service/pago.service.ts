import { DataSource } from "typeorm";
import { Pago } from "../entity/pago";
import { Tarifa } from "../entity/tarifa";
import { Detalle_pago } from "../entity/Detalle_pago";

export class PagoService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Pago);
  }

  // Crear un pago
  async create(data: Partial<Pago>): Promise<Pago> {
    const pago = this.repo.create(data);
    return await this.repo.save(pago);
  }

  // Obtener todos los pagos
  async findAll(): Promise<Pago[]> {
    return await this.repo.find({ relations: ["tarifa", "detalles"] });
  }

  // Obtener un pago por ID
  async findOne(id: number): Promise<Pago | null> {
    return await this.repo.findOne({
      where: { id_pago: id },
      relations: ["tarifa", "detalles"]
    });
  }

  // Actualizar un pago
  async update(id: number, data: Partial<Pago>): Promise<Pago | null> {
    const pago = await this.repo.findOne({ where: { id_pago: id } });
    if (!pago) return null;
    this.repo.merge(pago, data);
    return await this.repo.save(pago);
  }

  // Eliminar un pago
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
