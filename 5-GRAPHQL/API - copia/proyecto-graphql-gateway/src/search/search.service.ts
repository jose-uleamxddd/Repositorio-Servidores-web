import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { BusquedaVehiculoInput } from './dto/busqueda-vehiculo.input';
import { FiltroTicketsInput } from './dto/filtro-tickets.input';
import { BusquedaClientesInput } from './dto/busqueda-clientes.input';
import { Vehicle } from '../clients/entities/vehicle.entity';
import { Cliente } from '../clients/entities/cliente.entity';
import { Ticket } from '../operations/entities/ticket.entity';

@Injectable()
export class SearchService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('REST_API_URL') || 'http://localhost:3000';
  }

  /**
   * BÚSQUEDA 1: Buscar Vehículos con Filtros
   * Filtros: placa, tipoVehiculoId, clienteId, ordenamiento
   */
  async buscarVehiculos(filtros: BusquedaVehiculoInput): Promise<Vehicle[]> {
    try {
      const { data: vehiculos } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/vehiculos`),
      );

      let vehiculosArray = Array.isArray(vehiculos) ? vehiculos : [];

      // Aplicar filtros
      if (filtros.placa) {
        const placaBusqueda = filtros.placa.toLowerCase();
        vehiculosArray = vehiculosArray.filter((v: any) =>
          v.placa.toLowerCase().includes(placaBusqueda),
        );
      }

      if (filtros.tipoVehiculoId) {
        vehiculosArray = vehiculosArray.filter(
          (v: any) => v.tipoVehiculoId === filtros.tipoVehiculoId,
        );
      }

      if (filtros.clienteId) {
        vehiculosArray = vehiculosArray.filter((v: any) => v.clienteId === filtros.clienteId);
      }

      // Aplicar ordenamiento
      if (filtros.ordenarPor) {
        const campo = filtros.ordenarPor;
        const orden = filtros.orden === 'desc' ? -1 : 1;
        vehiculosArray.sort((a: any, b: any) => {
          if (a[campo] < b[campo]) return -1 * orden;
          if (a[campo] > b[campo]) return 1 * orden;
          return 0;
        });
      }

      return vehiculosArray;
    } catch (error) {
      console.error('Error en buscarVehiculos:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al buscar vehículos',
        error.response?.status || 500,
      );
    }
  }

  /**
   * BÚSQUEDA 2: Filtrar Tickets con Múltiples Criterios
   * Filtros: espacioId, tipoTarifaId, activos, fechas, ordenamiento
   */
  async filtrarTickets(filtros: FiltroTicketsInput): Promise<Ticket[]> {
    try {
      const { data: tickets } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/tickets`),
      );

      let ticketsArray = Array.isArray(tickets) ? tickets : [];

      // Aplicar filtros
      if (filtros.espacioId) {
        ticketsArray = ticketsArray.filter((t: any) => t.espacioId === filtros.espacioId);
      }

      if (filtros.tipoTarifaId) {
        ticketsArray = ticketsArray.filter((t: any) => t.tipoTarifaId === filtros.tipoTarifaId);
      }

      if (filtros.activos !== undefined) {
        ticketsArray = ticketsArray.filter((t: any) =>
          filtros.activos ? !t.fechaSalida : t.fechaSalida,
        );
      }

      if (filtros.fechaDesde) {
        const fechaDesde = new Date(filtros.fechaDesde).getTime();
        ticketsArray = ticketsArray.filter((t: any) => {
          const fechaIngreso = new Date(t.fechaIngreso).getTime();
          return fechaIngreso >= fechaDesde;
        });
      }

      if (filtros.fechaHasta) {
        const fechaHasta = new Date(filtros.fechaHasta).getTime();
        ticketsArray = ticketsArray.filter((t: any) => {
          const fechaIngreso = new Date(t.fechaIngreso).getTime();
          return fechaIngreso <= fechaHasta;
        });
      }

      // Aplicar ordenamiento
      if (filtros.ordenarPor) {
        const campo = filtros.ordenarPor;
        const orden = filtros.orden === 'desc' ? -1 : 1;
        ticketsArray.sort((a: any, b: any) => {
          const valorA = a[campo] ? new Date(a[campo]).getTime() : 0;
          const valorB = b[campo] ? new Date(b[campo]).getTime() : 0;
          if (valorA < valorB) return -1 * orden;
          if (valorA > valorB) return 1 * orden;
          return 0;
        });
      }

      return ticketsArray;
    } catch (error) {
      console.error('Error en filtrarTickets:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al filtrar tickets',
        error.response?.status || 500,
      );
    }
  }

  /**
   * BÚSQUEDA 3: Buscar Clientes con Filtros
   * Filtros: nombre, email, administradorId, ordenamiento
   */
  async buscarClientes(filtros: BusquedaClientesInput): Promise<Cliente[]> {
    try {
      const { data: clientes } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/clientes`),
      );

      let clientesArray = Array.isArray(clientes) ? clientes : [];

      // Aplicar filtros
      if (filtros.nombre) {
        const nombreBusqueda = filtros.nombre.toLowerCase();
        clientesArray = clientesArray.filter((c: any) =>
          c.nombre.toLowerCase().includes(nombreBusqueda),
        );
      }

      if (filtros.email) {
        const emailBusqueda = filtros.email.toLowerCase();
        clientesArray = clientesArray.filter((c: any) =>
          c.email.toLowerCase().includes(emailBusqueda),
        );
      }

      if (filtros.administradorId) {
        clientesArray = clientesArray.filter(
          (c: any) => c.administradorId === filtros.administradorId,
        );
      }

      // Aplicar ordenamiento
      if (filtros.ordenarPor) {
        const campo = filtros.ordenarPor;
        const orden = filtros.orden === 'desc' ? -1 : 1;
        clientesArray.sort((a: any, b: any) => {
          if (a[campo] < b[campo]) return -1 * orden;
          if (a[campo] > b[campo]) return 1 * orden;
          return 0;
        });
      }

      return clientesArray;
    } catch (error) {
      console.error('Error en buscarClientes:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al buscar clientes',
        error.response?.status || 500,
      );
    }
  }
}
