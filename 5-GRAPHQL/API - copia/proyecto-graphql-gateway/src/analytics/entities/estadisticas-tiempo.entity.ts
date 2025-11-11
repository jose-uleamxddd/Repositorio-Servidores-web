import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class EstadisticasTiempo {
  @Field(() => Float, { description: 'Tiempo promedio de permanencia (minutos)' })
  tiempoPromedioMinutos: number;

  @Field(() => Float, { description: 'Tiempo máximo registrado (minutos)' })
  tiempoMaximo: number;

  @Field(() => Float, { description: 'Tiempo mínimo registrado (minutos)' })
  tiempoMinimo: number;

  @Field(() => Int, { description: 'Total de tickets completados' })
  ticketsCompletados: number;
}
