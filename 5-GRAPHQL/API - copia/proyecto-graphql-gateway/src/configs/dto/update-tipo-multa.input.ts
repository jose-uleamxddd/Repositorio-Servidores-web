import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTipoMultaInput } from './create-tipo-multa.input';

@InputType()
export class UpdateTipoMultaInput extends PartialType(CreateTipoMultaInput) {
  @Field(() => ID)
  id: string;
}
