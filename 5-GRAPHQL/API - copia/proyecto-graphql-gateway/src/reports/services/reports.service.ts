import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ReporteOcupacion } from '../entities/reporte-ocupacion.entity';
import { ReporteIngresos } from '../entities/reporte-ingresos.entity';
import { ReporteMultas } from '../entities/reporte-multas.entity';

@Injectable()
export class ReportsService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('REST_API_URL') || 'http://localhost:3000';
  }

  /**
   * ELEMENTO 1 - REPORTE 1: Ocupación del Estacionamiento
   * Combina: Espacios + Tickets
   */
  async getReporteOcupacion(): Promise<ReporteOcupacion> {
    try {
      const { data: espacios } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/espacios`),
      );
      const { data: tickets } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/tickets`),
      );

      const espaciosArray = Array.isArray(espacios) ? espacios : [];
      const ticketsArray = Array.isArray(tickets) ? tickets : [];

      // Tickets activos (sin fecha de salida)
      const ticketsActivos = ticketsArray.filter((t: any) => !t.fechaSalida);

      const totalEspacios = espaciosArray.length;
      const espaciosOcupados = ticketsActivos.length;
      const espaciosDisponibles = totalEspacios - espaciosOcupados;
      const porcentajeOcupacion =
        totalEspacios > 0 ? (espaciosOcupados / totalEspacios) * 100 : 0;

      return {
        totalEspacios,
        espaciosOcupados,
        espaciosDisponibles,
        porcentajeOcupacion: parseFloat(porcentajeOcupacion.toFixed(2)),
      };
    } catch (error) {
      console.error('Error en getReporteOcupacion:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al generar reporte de ocupación',
        error.response?.status || 500,
      );
    }
  }

  /**
   * ELEMENTO 1 - REPORTE 2: Ingresos
   * Combina: Pagos + DetallePago
   */
  async getReporteIngresos(): Promise<ReporteIngresos> {
    try {
      const { data: pagos } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/pagos`),
      );
      const { data: detallePagos } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/detalle-pago`),
      );

      const pagosArray = Array.isArray(pagos) ? pagos : [];
      const detalleArray = Array.isArray(detallePagos) ? detallePagos : [];

      const totalIngresos = pagosArray.reduce(
        (sum: number, p: any) => sum + parseFloat(p.monto || 0),
        0,
      );

      const cantidadTransacciones = pagosArray.length;
      const ingresoPromedio = cantidadTransacciones > 0 ? totalIngresos / cantidadTransacciones : 0;

      return {
        totalIngresos: parseFloat(totalIngresos.toFixed(2)),
        cantidadTransacciones,
        ingresoPromedio: parseFloat(ingresoPromedio.toFixed(2)),
      };
    } catch (error) {
      console.error('Error en getReporteIngresos:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al generar reporte de ingresos',
        error.response?.status || 500,
      );
    }
  }

  /**
   * ELEMENTO 1 - REPORTE 3: Multas
   * Combina: Multas + DetallePago
   */
  async getReporteMultas(): Promise<ReporteMultas> {
    try {
      const { data: multas } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/multas`),
      );
      const { data: detallePagos } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/detalle-pago`),
      );

      const multasArray = Array.isArray(multas) ? multas : [];
      const detalleArray = Array.isArray(detallePagos) ? detallePagos : [];

      const totalMultas = multasArray.length;
      const multasPagadas = multasArray.filter((m: any) => m.detallePagoId).length;
      const multasPendientes = totalMultas - multasPagadas;

      const montoPendiente = multasArray
        .filter((m: any) => !m.detallePagoId)
        .reduce((sum: number, m: any) => sum + parseFloat(m.montoTotal || 0), 0);

      return {
        totalMultas,
        multasPagadas,
        multasPendientes,
        montoPendiente: parseFloat(montoPendiente.toFixed(2)),
      };
    } catch (error) {
      console.error('Error en getReporteMultas:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al generar reporte de multas',
        error.response?.status || 500,
      );
    }
  }
}
