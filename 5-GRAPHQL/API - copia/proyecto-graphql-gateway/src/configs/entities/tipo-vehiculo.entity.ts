import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TipoVehiculo {
  @Field(() => ID, { description: 'ID único del tipo de vehículo' })
  id: string;

  @Field({ description: 'Categoría del vehículo' })
  categoria: string;

  @Field({ description: 'Descripción del tipo de vehículo' })
  descripcion: string;

  @Field(() => ID, { description: 'ID del tipo de tarifa aplicable' })
  tipoTarifaId: string;
}
