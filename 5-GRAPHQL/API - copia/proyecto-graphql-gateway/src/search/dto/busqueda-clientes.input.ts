import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BusquedaClientesInput {
  @Field({ nullable: true, description: 'Búsqueda por nombre del cliente' })
  nombre?: string;

  @Field({ nullable: true, description: 'Búsqueda por email del cliente' })
  email?: string;

  @Field({ nullable: true, description: 'Filtrar por ID de administrador' })
  administradorId?: number;

  @Field({ nullable: true, description: 'Ordenar por campo (nombre, email, id)' })
  ordenarPor?: string;

  @Field({ nullable: true, description: 'Dirección del ordenamiento (asc, desc)' })
  orden?: string;
}
