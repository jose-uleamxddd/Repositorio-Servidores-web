import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TipoMultaService } from '../services/tipo-multa.service';
import { TipoMulta } from '../entities/tipo-multa.entity';
import { CreateTipoMultaInput } from '../dto/create-tipo-multa.input';
import { UpdateTipoMultaInput } from '../dto/update-tipo-multa.input';

@Resolver(() => TipoMulta)
export class TipoMultaResolver {
  constructor(private readonly tipoMultaService: TipoMultaService) {}

  @Mutation(() => TipoMulta, { description: 'Crear un nuevo tipo de multa' })
  createTipoMulta(
    @Args('createTipoMultaInput') createTipoMultaInput: CreateTipoMultaInput,
  ): Promise<TipoMulta> {
    return this.tipoMultaService.create(createTipoMultaInput);
  }

  @Query(() => [TipoMulta], { name: 'tiposMulta', description: 'Obtener todos los tipos de multa' })
  findAllTiposMulta(): Promise<TipoMulta[]> {
    return this.tipoMultaService.findAll();
  }

  @Query(() => TipoMulta, { name: 'tipoMulta', description: 'Obtener un tipo de multa por ID' })
  findOneTipoMulta(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TipoMulta> {
    return this.tipoMultaService.findOne(id);
  }

  @Mutation(() => TipoMulta, { description: 'Actualizar un tipo de multa' })
  updateTipoMulta(
    @Args('updateTipoMultaInput') updateTipoMultaInput: UpdateTipoMultaInput,
  ): Promise<TipoMulta> {
    return this.tipoMultaService.update(updateTipoMultaInput.id, updateTipoMultaInput);
  }

  @Mutation(() => TipoMulta, { description: 'Eliminar un tipo de multa' })
  removeTipoMulta(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TipoMulta> {
    return this.tipoMultaService.remove(id);
  }
}
