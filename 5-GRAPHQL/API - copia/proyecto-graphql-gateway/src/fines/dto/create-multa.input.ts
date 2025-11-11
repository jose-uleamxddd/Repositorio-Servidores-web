import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class CreateMultaInput {
  @Field({ description: 'Descripción de la multa' })
  descripcion: string;

  @Field(() => Float, { description: 'Monto total de la multa' })
  montoTotal: number;

  @Field(() => ID, { description: 'ID del tipo de multa aplicada' })
  tipoMultaId: string;

  @Field(() => ID, { description: 'ID del detalle de pago asociado' })
  detallePagoId: string;
}
