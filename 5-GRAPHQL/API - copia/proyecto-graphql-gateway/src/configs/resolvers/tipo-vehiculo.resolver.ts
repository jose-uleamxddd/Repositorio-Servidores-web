import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TipoVehiculoService } from '../services/tipo-vehiculo.service';
import { TipoVehiculo } from '../entities/tipo-vehiculo.entity';
import { CreateTipoVehiculoInput } from '../dto/create-tipo-vehiculo.input';
import { UpdateTipoVehiculoInput } from '../dto/update-tipo-vehiculo.input';

@Resolver(() => TipoVehiculo)
export class TipoVehiculoResolver {
  constructor(private readonly tipoVehiculoService: TipoVehiculoService) {}

  @Mutation(() => TipoVehiculo, { description: 'Crear un nuevo tipo de vehículo' })
  createTipoVehiculo(
    @Args('createTipoVehiculoInput') createTipoVehiculoInput: CreateTipoVehiculoInput,
  ): Promise<TipoVehiculo> {
    return this.tipoVehiculoService.create(createTipoVehiculoInput);
  }

  @Query(() => [TipoVehiculo], { name: 'tiposVehiculo', description: 'Obtener todos los tipos de vehículo' })
  findAllTiposVehiculo(): Promise<TipoVehiculo[]> {
    return this.tipoVehiculoService.findAll();
  }

  @Query(() => TipoVehiculo, { name: 'tipoVehiculo', description: 'Obtener un tipo de vehículo por ID' })
  findOneTipoVehiculo(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TipoVehiculo> {
    return this.tipoVehiculoService.findOne(id);
  }

  @Mutation(() => TipoVehiculo, { description: 'Actualizar un tipo de vehículo' })
  updateTipoVehiculo(
    @Args('updateTipoVehiculoInput') updateTipoVehiculoInput: UpdateTipoVehiculoInput,
  ): Promise<TipoVehiculo> {
    return this.tipoVehiculoService.update(updateTipoVehiculoInput.id, updateTipoVehiculoInput);
  }

  @Mutation(() => TipoVehiculo, { description: 'Eliminar un tipo de vehículo' })
  removeTipoVehiculo(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TipoVehiculo> {
    return this.tipoVehiculoService.remove(id);
  }
}
