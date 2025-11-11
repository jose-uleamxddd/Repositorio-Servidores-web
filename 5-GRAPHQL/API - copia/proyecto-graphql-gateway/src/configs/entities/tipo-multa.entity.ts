import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TipoMulta {
  @Field(() => ID, { description: 'ID único del tipo de multa' })
  id: string;

  @Field({ description: 'Nombre del tipo de multa' })
  nombre: string;

  @Field(() => Float, { description: 'Monto base de la multa' })
  monto: number;
}
