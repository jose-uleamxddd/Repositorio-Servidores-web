import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTipoVehiculoInput } from './create-tipo-vehiculo.input';

@InputType()
export class UpdateTipoVehiculoInput extends PartialType(CreateTipoVehiculoInput) {
  @Field(() => ID)
  id: string;
}
