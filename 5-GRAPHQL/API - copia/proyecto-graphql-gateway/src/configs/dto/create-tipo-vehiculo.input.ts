import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTipoVehiculoInput {
  @Field({ description: 'Categoría del vehículo' })
  categoria: string;

  @Field({ description: 'Descripción del tipo de vehículo' })
  descripcion: string;

  @Field(() => ID, { description: 'ID del tipo de tarifa aplicable' })
  tipoTarifaId: string;
}
