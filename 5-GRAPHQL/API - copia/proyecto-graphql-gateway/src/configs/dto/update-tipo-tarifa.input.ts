import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTipoTarifaInput } from './create-tipo-tarifa.input';

@InputType()
export class UpdateTipoTarifaInput extends PartialType(CreateTipoTarifaInput) {
  @Field(() => ID)
  id: string;
}
