import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateDetallePagoInput {
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
