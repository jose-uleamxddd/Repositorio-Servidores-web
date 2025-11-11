import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class ReporteIngresos {
  @Field(() => Float, { description: 'Total de ingresos' })
  totalIngresos: number;

  @Field(() => Int, { description: 'Cantidad de transacciones' })
  cantidadTransacciones: number;

  @Field(() => Float, { description: 'Ingreso promedio por transacción' })
  ingresoPromedio: number;
}
