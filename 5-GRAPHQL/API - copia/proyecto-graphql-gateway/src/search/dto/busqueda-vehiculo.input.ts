import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BusquedaVehiculoInput {
  @Field({ nullable: true, description: 'Búsqueda por placa del vehículo' })
  placa?: string;

  @Field({ nullable: true, description: 'Filtrar por ID de tipo de vehículo' })
  tipoVehiculoId?: number;

  @Field({ nullable: true, description: 'Filtrar por ID de cliente' })
  clienteId?: number;

  @Field({ nullable: true, description: 'Ordenar por campo (placa, modelo, tipoVehiculoId)' })
  ordenarPor?: string;

  @Field({ nullable: true, description: 'Dirección del ordenamiento (asc, desc)' })
  orden?: string;
}
