import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateDetallePagoInput } from './create-detalle-pago.input';

@InputType()
export class UpdateDetallePagoInput extends PartialType(CreateDetallePagoInput) {
  @Field(() => ID)
  id: string;
}
