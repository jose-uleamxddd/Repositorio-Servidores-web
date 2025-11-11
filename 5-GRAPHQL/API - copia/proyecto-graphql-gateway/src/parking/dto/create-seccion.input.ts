import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeccionInput {
  @Field({ description: 'Letra identificadora de la sección' })
  letraSeccion: string;
}
