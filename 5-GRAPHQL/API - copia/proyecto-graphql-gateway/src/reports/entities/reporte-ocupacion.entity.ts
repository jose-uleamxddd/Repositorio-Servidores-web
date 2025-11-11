import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ReporteOcupacion {
  @Field(() => Int, { description: 'Total de espacios' })
  totalEspacios: number;

  @Field(() => Int, { description: 'Espacios ocupados' })
  espaciosOcupados: number;

  @Field(() => Int, { description: 'Espacios disponibles' })
  espaciosDisponibles: number;

  @Field(() => Float, { description: 'Porcentaje de ocupación' })
  porcentajeOcupacion: number;
}
