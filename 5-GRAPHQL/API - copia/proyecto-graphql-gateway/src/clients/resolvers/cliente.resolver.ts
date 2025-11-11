import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';
import { CreateClienteInput } from '../dto/create-cliente.input';
import { UpdateClienteInput } from '../dto/update-cliente.input';

@Resolver(() => Cliente)
export class ClienteResolver {
  constructor(private readonly clienteService: ClienteService) {}

  @Mutation(() => Cliente, { description: 'Crear un nuevo cliente' })
  createCliente(
    @Args('createClienteInput') createClienteInput: CreateClienteInput,
  ): Promise<Cliente> {
    return this.clienteService.create(createClienteInput);
  }

  @Query(() => [Cliente], { name: 'clientes', description: 'Obtener todos los clientes' })
  findAllClientes(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Query(() => Cliente, { name: 'cliente', description: 'Obtener un cliente por ID' })
  findOneCliente(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Mutation(() => Cliente, { description: 'Actualizar un cliente' })
  updateCliente(
    @Args('updateClienteInput') updateClienteInput: UpdateClienteInput,
  ): Promise<Cliente> {
    return this.clienteService.update(updateClienteInput.id, updateClienteInput);
  }

  @Mutation(() => Cliente, { description: 'Eliminar un cliente' })
  removeCliente(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Cliente> {
    return this.clienteService.remove(id);
  }
}
