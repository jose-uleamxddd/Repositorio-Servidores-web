import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID, { description: 'ID único del vehículo' })
  id: string;

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
