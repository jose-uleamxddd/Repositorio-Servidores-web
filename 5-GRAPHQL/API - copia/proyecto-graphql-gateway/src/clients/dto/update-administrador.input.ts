import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateAdministradorInput } from './create-administrador.input';

@InputType()
export class UpdateAdministradorInput extends PartialType(CreateAdministradorInput) {
  @Field(() => ID)
  id: string;
}
