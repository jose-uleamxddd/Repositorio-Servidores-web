import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class ReporteMultas {
  @Field(() => Int, { description: 'Total de multas' })
  totalMultas: number;

  @Field(() => Int, { description: 'Multas pagadas' })
  multasPagadas: number;

  @Field(() => Int, { description: 'Multas pendientes' })
  multasPendientes: number;

  @Field(() => Float, { description: 'Monto total pendiente' })
  montoPendiente: number;
}
