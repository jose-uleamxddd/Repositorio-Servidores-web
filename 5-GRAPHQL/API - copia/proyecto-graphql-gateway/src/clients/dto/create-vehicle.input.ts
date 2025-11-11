import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {
  @Field({ description: 'Placa del vehículo' })
  placa: string;

  @Field({ description: 'Marca del vehículo' })
  marca: string;

  @Field({ description: 'Modelo del vehículo' })
  modelo: string;

  @Field(() => ID, { description: 'ID del cliente propietario' })
  clienteId: string;

  @Field(() => ID, { description: 'ID del tipo de vehículo' })
  tipoVehiculoId: string;
}
