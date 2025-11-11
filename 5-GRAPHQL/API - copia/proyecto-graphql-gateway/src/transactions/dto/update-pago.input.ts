import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreatePagoInput } from './create-pago.input';

@InputType()
export class UpdatePagoInput extends PartialType(CreatePagoInput) {
  @Field(() => ID)
  id: string;
}
