import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Seccion {
  @Field(() => ID, { description: 'ID único de la sección' })
  id: string;

  @Field({ description: 'Letra identificadora de la sección' })
  letraSeccion: string;
}
