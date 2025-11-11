import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateSeccionInput } from './create-seccion.input';

@InputType()
export class UpdateSeccionInput extends PartialType(CreateSeccionInput) {
  @Field(() => ID)
  id: string;
}
