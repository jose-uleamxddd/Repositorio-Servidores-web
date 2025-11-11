import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTipoMultaInput {
  @Field({ description: 'Nombre del tipo de multa' })
  nombre: string;

  @Field(() => Float, { description: 'Monto base de la multa' })
  monto: number;
}
