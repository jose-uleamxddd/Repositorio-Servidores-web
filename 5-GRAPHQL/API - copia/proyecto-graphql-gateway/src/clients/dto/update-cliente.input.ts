import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateClienteInput } from './create-cliente.input';

@InputType()
export class UpdateClienteInput extends PartialType(CreateClienteInput) {
  @Field(() => ID)
  id: string;
}
