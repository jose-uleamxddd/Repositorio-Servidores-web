import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Pago {
  @Field(() => ID, { description: 'ID único del pago' })
  id: string;

  @Field(() => Float, { description: 'Monto del pago' })
  monto: number;

  @Field(() => ID, { description: 'ID del tipo de tarifa aplicada' })
  tipoTarifaId: string;
}
