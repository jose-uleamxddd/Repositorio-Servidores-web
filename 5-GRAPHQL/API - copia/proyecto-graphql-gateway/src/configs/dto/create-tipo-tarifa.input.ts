import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTipoTarifaInput {
  @Field({ description: 'Tipo de tarifa' })
  tipoTarifa: string;

  @Field(() => Float, { description: 'Precio por hora' })
  precioHora: number;

  @Field(() => Float, { description: 'Precio por día' })
  precioDia: number;
}
