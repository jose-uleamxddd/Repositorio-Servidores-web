import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleInput } from '../dto/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Mutation(() => Vehicle, { description: 'Crear un nuevo vehículo' })
  createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<Vehicle> {
    return this.vehicleService.create(createVehicleInput);
  }

  @Query(() => [Vehicle], { name: 'vehicles', description: 'Obtener todos los vehículos' })
  findAllVehicles(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle, { name: 'vehicle', description: 'Obtener un vehículo por ID' })
  findOneVehicle(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  @Mutation(() => Vehicle, { description: 'Actualizar un vehículo' })
  updateVehicle(
    @Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput,
  ): Promise<Vehicle> {
    return this.vehicleService.update(updateVehicleInput.id, updateVehicleInput);
  }

  @Mutation(() => Vehicle, { description: 'Eliminar un vehículo' })
  removeVehicle(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Vehicle> {
    return this.vehicleService.remove(id);
  }
}
