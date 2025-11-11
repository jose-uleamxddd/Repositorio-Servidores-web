import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreatePagoInput {
  @Field(() => Float, { description: 'Monto del pago' })
  monto: number;

  @Field(() => ID, { description: 'ID del tipo de tarifa aplicada' })
  tipoTarifaId: string;
}
