import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MultaService } from '../services/multa.service';
import { Multa } from '../entities/multa.entity';
import { CreateMultaInput } from '../dto/create-multa.input';
import { UpdateMultaInput } from '../dto/update-multa.input';

@Resolver(() => Multa)
export class MultaResolver {
  constructor(private readonly multaService: MultaService) {}

  @Mutation(() => Multa, { description: 'Crear una nueva multa' })
  createMulta(
    @Args('createMultaInput') createMultaInput: CreateMultaInput,
  ): Promise<Multa> {
    return this.multaService.create(createMultaInput);
  }

  @Query(() => [Multa], { name: 'multas', description: 'Obtener todas las multas' })
  findAllMultas(): Promise<Multa[]> {
    return this.multaService.findAll();
  }

  @Query(() => Multa, { name: 'multa', description: 'Obtener una multa por ID' })
  findOneMulta(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Multa> {
    return this.multaService.findOne(id);
  }

  @Mutation(() => Multa, { description: 'Actualizar una multa' })
  updateMulta(
    @Args('updateMultaInput') updateMultaInput: UpdateMultaInput,
  ): Promise<Multa> {
    return this.multaService.update(updateMultaInput.id, updateMultaInput);
  }

  @Mutation(() => Multa, { description: 'Eliminar una multa' })
  removeMulta(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Multa> {
    return this.multaService.remove(id);
  }
}
