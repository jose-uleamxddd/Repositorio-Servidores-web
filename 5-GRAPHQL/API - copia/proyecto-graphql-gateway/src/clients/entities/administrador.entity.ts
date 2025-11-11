import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Administrador {
  @Field(() => ID, { description: 'ID único del administrador' })
  id: string;

  @Field({ description: 'Nombre del administrador' })
  nombre: string;

  @Field({ description: 'Email del administrador' })
  email: string;

  @Field({ description: 'Indica si el administrador está activo' })
  activo: boolean;

  @Field({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @Field({ description: 'Última fecha de actualización' })
  fechaActualizacion: Date;
}
