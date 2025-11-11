import { DataSource } from "typeorm";
import { Cliente } from "../entity/cliente";

export class ClienteService {
  private repo;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Cliente);
  }

  // Crear un cliente
  async create(data: Partial<Cliente>): Promise<Cliente> {
    const cliente = this.repo.create(data);
    return await this.repo.save(cliente);
  }

  // Obtener todos los clientes
  async findAll(): Promise<Cliente[]> {
    return await this.repo.find({ relations: ["vehiculos"] });
  }

  // Obtener un cliente por ID
  async findOne(id: number): Promise<Cliente | null> {
    return await this.repo.findOne({
      where: { id_cliente: id },
      relations: ["vehiculos"]
    });
  }

  // Actualizar un cliente
  async update(id: number, data: Partial<Cliente>): Promise<Cliente | null> {
    const cliente = await this.repo.findOne({ where: { id_cliente: id } });
    if (!cliente) return null;
    this.repo.merge(cliente, data);
    return await this.repo.save(cliente);
  }

  // Eliminar un cliente
  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
