import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class DetallePago {
  @Field(() => ID, { description: 'ID único del detalle de pago' })
  id: string;

  @Field({ description: 'Método de pago' })
  metodo: string;

  @Field({ description: 'Fecha del pago' })
  fechaPago: string;

  @Field(() => Float, { description: 'Pago total' })
  pagoTotal: number;

  @Field(() => ID, { description: 'ID del ticket asociado' })
  ticketId: string;

  @Field(() => ID, { description: 'ID del pago relacionado' })
  pagoId: string;
}
