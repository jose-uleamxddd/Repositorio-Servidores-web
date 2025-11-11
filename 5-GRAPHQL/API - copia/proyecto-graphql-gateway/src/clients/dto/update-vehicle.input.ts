import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
  @Field(() => ID)
  id: string;
}
