import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Cliente {
  @Field(() => ID, { description: 'ID único del cliente' })
  id: string;

  @Field({ description: 'Nombre completo del cliente' })
  nombre: string;

  @Field({ description: 'Email del cliente' })
  email: string;

  @Field({ description: 'Teléfono del cliente' })
  telefono: string;
}
