import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateEspacioInput {
  @Field({ description: 'Número del espacio' })
  numero: string;

  @Field({ description: 'Estado del espacio (disponible/ocupado)' })
  estado: boolean;

  @Field(() => ID, { description: 'ID de la sección a la que pertenece' })
  seccionId: string;
}
