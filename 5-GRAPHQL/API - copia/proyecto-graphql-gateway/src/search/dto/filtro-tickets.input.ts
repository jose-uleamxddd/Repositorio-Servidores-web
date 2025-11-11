import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FiltroTicketsInput {
  @Field({ nullable: true, description: 'Filtrar por ID de espacio' })
  espacioId?: number;

  @Field({ nullable: true, description: 'Filtrar por ID de tipo de tarifa' })
  tipoTarifaId?: number;

  @Field({ nullable: true, description: 'Filtrar solo tickets activos (sin fecha de salida)' })
  activos?: boolean;

  @Field({ nullable: true, description: 'Fecha de ingreso desde (formato ISO)' })
  fechaDesde?: string;

  @Field({ nullable: true, description: 'Fecha de ingreso hasta (formato ISO)' })
  fechaHasta?: string;

  @Field({ nullable: true, description: 'Ordenar por campo (fechaIngreso, fechaSalida)' })
  ordenarPor?: string;

  @Field({ nullable: true, description: 'Dirección del ordenamiento (asc, desc)' })
  orden?: string;
}
