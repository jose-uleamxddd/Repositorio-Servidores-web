import { DataSource } from "typeorm";
import { Detalle_pago } from "../entity/Detalle_pago";
import { Pago } from "../entity/pago";
import { Ticket } from "../entity/ticket";
import { Multa } from "../entity/multa";

export class DetallePagoService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Detalle_pago);
  }

  // Crear un detalle de pago
  async create(data: Partial<Detalle_pago>): Promise<Detalle_pago> {
    const detalle = this.repo.create(data);
    return await this.repo.save(detalle);
  }

  // Obtener todos los detalles de pago
  async findAll(): Promise<Detalle_pago[]> {
    return await this.repo.find({ relations: ["pago", "ticket", "multas"] });
  }

  // Obtener un detalle de pago por ID
  async findOne(id: number): Promise<Detalle_pago | null> {
    return await this.repo.findOne({
      where: { id_detalle_pago: id },
      relations: ["pago", "ticket", "multas"]
    });
  }

  // Actualizar un detalle de pago
  async update(id: number, data: Partial<Detalle_pago>): Promise<Detalle_pago | null> {
    const detalle = await this.repo.findOne({ where: { id_detalle_pago: id } });
    if (!detalle) return null;
    this.repo.merge(detalle, data);
    return await this.repo.save(detalle);
  }

  // Eliminar un detalle de pago
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
