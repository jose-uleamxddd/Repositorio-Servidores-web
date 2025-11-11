import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TipoTarifa {
  @Field(() => ID, { description: 'ID único del tipo de tarifa' })
  id: string;

  @Field({ description: 'Tipo de tarifa' })
  tipoTarifa: string;

  @Field(() => Float, { description: 'Precio por hora' })
  precioHora: number;

  @Field(() => Float, { description: 'Precio por día' })
  precioDia: number;
}
