import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class KPIsFinancieros {
  @Field(() => Float, { description: 'Ingreso promedio por vehículo' })
  ingresoPorVehiculo: number;

  @Field(() => Float, { description: 'Total de multas recaudadas' })
  multasRecaudadas: number;

  @Field(() => Float, { description: 'Ingreso total (pagos + multas)' })
  ingresoTotal: number;

  @Field(() => Int, { description: 'Cantidad de pagos procesados' })
  pagosProcesados: number;
}
