import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { BusquedaVehiculoInput } from './dto/busqueda-vehiculo.input';
import { FiltroTicketsInput } from './dto/filtro-tickets.input';
import { BusquedaClientesInput } from './dto/busqueda-clientes.input';
import { Vehicle } from '../clients/entities/vehicle.entity';
import { Cliente } from '../clients/entities/cliente.entity';
import { Ticket } from '../operations/entities/ticket.entity';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [Vehicle], {
    name: 'buscarVehiculos',
    description:
      'Búsqueda avanzada de vehículos con filtros por placa, tipo de vehículo, cliente y ordenamiento personalizado.',
  })
  buscarVehiculos(
    @Args('filtros', { nullable: true }) filtros: BusquedaVehiculoInput = {},
  ): Promise<Vehicle[]> {
    return this.searchService.buscarVehiculos(filtros);
  }

  @Query(() => [Ticket], {
    name: 'filtrarTickets',
    description:
      'Filtrado avanzado de tickets por espacio, tipo de tarifa, estado (activos/completados), rango de fechas y ordenamiento.',
  })
  filtrarTickets(
    @Args('filtros', { nullable: true }) filtros: FiltroTicketsInput = {},
  ): Promise<Ticket[]> {
    return this.searchService.filtrarTickets(filtros);
  }

  @Query(() => [Cliente], {
    name: 'buscarClientes',
    description:
      'Búsqueda avanzada de clientes con filtros por nombre, email, administrador asignado y ordenamiento personalizado.',
  })
  buscarClientes(
    @Args('filtros', { nullable: true }) filtros: BusquedaClientesInput = {},
  ): Promise<Cliente[]> {
    return this.searchService.buscarClientes(filtros);
  }
}
