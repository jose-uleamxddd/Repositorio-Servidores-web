import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TipoTarifaService } from '../services/tipo-tarifa.service';
import { TipoTarifa } from '../entities/tipo-tarifa.entity';
import { CreateTipoTarifaInput } from '../dto/create-tipo-tarifa.input';
import { UpdateTipoTarifaInput } from '../dto/update-tipo-tarifa.input';

@Resolver(() => TipoTarifa)
export class TipoTarifaResolver {
  constructor(private readonly tipoTarifaService: TipoTarifaService) {}

  @Mutation(() => TipoTarifa, { description: 'Crear un nuevo tipo de tarifa' })
  createTipoTarifa(
    @Args('createTipoTarifaInput') createTipoTarifaInput: CreateTipoTarifaInput,
  ): Promise<TipoTarifa> {
    return this.tipoTarifaService.create(createTipoTarifaInput);
  }

  @Query(() => [TipoTarifa], { name: 'tiposTarifa', description: 'Obtener todos los tipos de tarifa' })
  findAllTiposTarifa(): Promise<TipoTarifa[]> {
    return this.tipoTarifaService.findAll();
  }

  @Query(() => TipoTarifa, { name: 'tipoTarifa', description: 'Obtener un tipo de tarifa por ID' })
  findOneTipoTarifa(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TipoTarifa> {
    return this.tipoTarifaService.findOne(id);
  }

  @Mutation(() => TipoTarifa, { description: 'Actualizar un tipo de tarifa' })
  updateTipoTarifa(
    @Args('updateTipoTarifaInput') updateTipoTarifaInput: UpdateTipoTarifaInput,
  ): Promise<TipoTarifa> {
    return this.tipoTarifaService.update(updateTipoTarifaInput.id, updateTipoTarifaInput);
  }

  @Mutation(() => TipoTarifa, { description: 'Eliminar un tipo de tarifa' })
  removeTipoTarifa(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TipoTarifa> {
    return this.tipoTarifaService.remove(id);
  }
}
