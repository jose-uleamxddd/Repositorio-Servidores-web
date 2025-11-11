import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClienteInput {
  @Field({ description: 'Nombre completo del cliente' })
  nombre: string;

  @Field({ description: 'Email del cliente' })
  email: string;

  @Field({ description: 'Teléfono del cliente' })
  telefono: string;
}
