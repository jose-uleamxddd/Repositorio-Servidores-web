import { DataSource } from "typeorm";
import { Ticket } from "../entity/ticket";
import { Vehiculo } from "../entity/Vehiculo";
import { Espacio } from "../entity/espacio";
import { Detalle_pago } from "../entity/Detalle_pago";

export class TicketService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Ticket);
  }

  // Crear un ticket
  async create(data: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.repo.create(data);
    return await this.repo.save(ticket);
  }

  // Obtener todos los tickets
  async findAll(): Promise<Ticket[]> {
    return await this.repo.find({ relations: ["vehiculo", "espacio", "detalles"] });
  }

  // Obtener un ticket por ID
  async findOne(id: number): Promise<Ticket | null> {
    return await this.repo.findOne({
      where: { id_ticket: id },
      relations: ["vehiculo", "espacio", "detalles"]
    });
  }

  // Actualizar un ticket
  async update(id: number, data: Partial<Ticket>): Promise<Ticket | null> {
    const ticket = await this.repo.findOne({ where: { id_ticket: id } });
    if (!ticket) return null;
    this.repo.merge(ticket, data);
    return await this.repo.save(ticket);
  }

  // Eliminar un ticket
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
