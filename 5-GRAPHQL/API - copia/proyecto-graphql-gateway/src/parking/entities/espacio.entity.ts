import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Espacio {
  @Field(() => ID, { description: 'ID único del espacio' })
  id: string;

  @Field({ description: 'Número del espacio' })
  numero: string;

  @Field({ description: 'Estado del espacio (disponible/ocupado)' })
  estado: boolean;

  @Field(() => ID, { description: 'ID de la sección a la que pertenece' })
  seccionId: string;
}
