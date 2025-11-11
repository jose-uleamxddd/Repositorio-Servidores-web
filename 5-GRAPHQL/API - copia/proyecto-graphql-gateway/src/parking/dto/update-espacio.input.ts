import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateEspacioInput } from './create-espacio.input';

@InputType()
export class UpdateEspacioInput extends PartialType(CreateEspacioInput) {
  @Field(() => ID)
  id: string;
}
