import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdministradorInput {
  @Field({ description: 'Nombre del administrador' })
  nombre: string;

  @Field({ description: 'Email del administrador' })
  email: string;

  @Field({ description: 'Contraseña del administrador' })
  contrasena: string;

  @Field({ nullable: true, description: 'Indica si el administrador está activo', defaultValue: true })
  activo?: boolean;
}
