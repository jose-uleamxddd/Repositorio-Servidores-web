import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateMultaInput } from './create-multa.input';

@InputType()
export class UpdateMultaInput extends PartialType(CreateMultaInput) {
  @Field(() => ID)
  id: string;
}
