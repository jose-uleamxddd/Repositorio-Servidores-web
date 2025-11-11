import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Ticket {
  @Field(() => ID, { description: 'ID único del ticket' })
  id: string;

  @Field({ description: 'Fecha y hora de ingreso' })
  fechaIngreso: string;

  @Field({ nullable: true, description: 'Fecha y hora de salida' })
  fechaSalida?: string;

  @Field(() => ID, { description: 'ID del vehículo asociado' })
  vehiculoId: string;

  @Field(() => ID, { description: 'ID del espacio asignado' })
  espacioId: string;

  @Field(() => ID, { nullable: true, description: 'ID del detalle de pago' })
  detallePagoId?: string;
}
