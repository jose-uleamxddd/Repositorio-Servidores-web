import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class MetricasEstacionamiento {
  @Field(() => Int, { description: 'Total de vehículos atendidos hoy' })
  vehiculosAtendidos: number;

  @Field(() => Float, { description: 'Tiempo promedio de estadía (horas)' })
  tiempoPromedioEstadia: number;

  @Field(() => Float, { description: 'Tasa de rotación (vehículos/espacio/día)' })
  tasaRotacion: number;

  @Field(() => Int, { description: 'Total de clientes activos' })
  clientesActivos: number;
}
