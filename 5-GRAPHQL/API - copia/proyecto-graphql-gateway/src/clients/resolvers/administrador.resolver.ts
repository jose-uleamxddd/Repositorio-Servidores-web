import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AdministradorService } from '../services/administrador.service';
import { Administrador } from '../entities/administrador.entity';
import { CreateAdministradorInput } from '../dto/create-administrador.input';
import { UpdateAdministradorInput } from '../dto/update-administrador.input';

@Resolver(() => Administrador)
export class AdministradorResolver {
  constructor(private readonly administradorService: AdministradorService) {}

  @Mutation(() => Administrador, { description: 'Crear un nuevo administrador' })
  createAdministrador(
    @Args('createAdministradorInput') createAdministradorInput: CreateAdministradorInput,
  ): Promise<Administrador> {
    return this.administradorService.create(createAdministradorInput);
  }

  @Query(() => [Administrador], { name: 'administradores', description: 'Obtener todos los administradores' })
  findAllAdministradores(): Promise<Administrador[]> {
    return this.administradorService.findAll();
  }

  @Query(() => Administrador, { name: 'administrador', description: 'Obtener un administrador por ID' })
  findOneAdministrador(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Administrador> {
    return this.administradorService.findOne(id);
  }

  @Mutation(() => Administrador, { description: 'Actualizar un administrador' })
  updateAdministrador(
    @Args('updateAdministradorInput') updateAdministradorInput: UpdateAdministradorInput,
  ): Promise<Administrador> {
    return this.administradorService.update(updateAdministradorInput.id, updateAdministradorInput);
  }

  @Mutation(() => Administrador, { description: 'Eliminar un administrador' })
  removeAdministrador(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Administrador> {
    return this.administradorService.remove(id);
  }
}
