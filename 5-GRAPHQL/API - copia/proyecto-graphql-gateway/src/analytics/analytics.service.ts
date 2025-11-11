import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MetricasEstacionamiento } from './entities/metricas-estacionamiento.entity';
import { EstadisticasTiempo } from './entities/estadisticas-tiempo.entity';
import { KPIsFinancieros } from './entities/kpis-financieros.entity';

@Injectable()
export class AnalyticsService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('REST_API_URL') || 'http://localhost:3000';
  }

  async getMetricasEstacionamiento(): Promise<MetricasEstacionamiento> {
    try {
      const { data: tickets } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/tickets`),
      );
      const { data: espacios } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/espacios`),
      );
      const { data: clientes } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/clientes`),
      );

      const ticketsArray = Array.isArray(tickets) ? tickets : [];
      const espaciosArray = Array.isArray(espacios) ? espacios : [];
      const clientesArray = Array.isArray(clientes) ? clientes : [];

      // Tickets completados (con fecha de salida)
      const ticketsCompletados = ticketsArray.filter((t: any) => t.fechaSalida);
      const vehiculosAtendidos = ticketsCompletados.length;

      // Calcular tiempo promedio de estadía
      let tiempoPromedioEstadia = 0;
      if (ticketsCompletados.length > 0) {
        const tiempos = ticketsCompletados.map((t: any) => {
          const ingreso = new Date(t.fechaIngreso).getTime();
          const salida = new Date(t.fechaSalida).getTime();
          return (salida - ingreso) / (1000 * 60 * 60); // Horas
        });
        tiempoPromedioEstadia = tiempos.reduce((a: number, b: number) => a + b, 0) / tiempos.length;
      }

      // Tasa de rotación (vehículos atendidos / espacios totales)
      const tasaRotacion = espaciosArray.length > 0 ? vehiculosAtendidos / espaciosArray.length : 0;

      return {
        vehiculosAtendidos,
        tiempoPromedioEstadia: parseFloat(tiempoPromedioEstadia.toFixed(2)),
        tasaRotacion: parseFloat(tasaRotacion.toFixed(2)),
        clientesActivos: clientesArray.length,
      };
    } catch (error) {
      console.error('Error en getMetricasEstacionamiento:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al calcular métricas',
        error.response?.status || 500,
      );
    }
  }

  /**
   * ANÁLISIS 2: Estadísticas de Tiempo
   * Cálculos: Promedios, máximos, mínimos
   */
  async getEstadisticasTiempo(): Promise<EstadisticasTiempo> {
    try {
      const { data: tickets } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/tickets`),
      );

      const ticketsArray = Array.isArray(tickets) ? tickets : [];
      const ticketsCompletados = ticketsArray.filter((t: any) => t.fechaSalida);

      if (ticketsCompletados.length === 0) {
        return {
          tiempoPromedioMinutos: 0,
          tiempoMaximo: 0,
          tiempoMinimo: 0,
          ticketsCompletados: 0,
        };
      }

      // Calcular tiempos en minutos
      const tiempos = ticketsCompletados.map((t: any) => {
        const ingreso = new Date(t.fechaIngreso).getTime();
        const salida = new Date(t.fechaSalida).getTime();
        return (salida - ingreso) / (1000 * 60); // Minutos
      });

      const tiempoPromedioMinutos = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
      const tiempoMaximo = Math.max(...tiempos);
      const tiempoMinimo = Math.min(...tiempos);

      return {
        tiempoPromedioMinutos: parseFloat(tiempoPromedioMinutos.toFixed(2)),
        tiempoMaximo: parseFloat(tiempoMaximo.toFixed(2)),
        tiempoMinimo: parseFloat(tiempoMinimo.toFixed(2)),
        ticketsCompletados: ticketsCompletados.length,
      };
    } catch (error) {
      console.error('Error en getEstadisticasTiempo:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al calcular estadísticas de tiempo',
        error.response?.status || 500,
      );
    }
  }

  /**
   * ANÁLISIS 3: KPIs Financieros
   * Cálculos: Ingresos promedio, totales, multas
   */
  async getKPIsFinancieros(): Promise<KPIsFinancieros> {
    try {
      const { data: pagos } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/pagos`),
      );
      const { data: multas } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/multas`),
      );
      const { data: tickets } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/tickets`),
      );

      const pagosArray = Array.isArray(pagos) ? pagos : [];
      const multasArray = Array.isArray(multas) ? multas : [];
      const ticketsArray = Array.isArray(tickets) ? tickets : [];

      // Total de ingresos por pagos
      const totalPagos = pagosArray.reduce(
        (sum: number, p: any) => sum + parseFloat(p.monto || 0),
        0,
      );

      // Multas recaudadas (con detallePagoId)
      const multasRecaudadas = multasArray
        .filter((m: any) => m.detallePagoId)
        .reduce((sum: number, m: any) => sum + parseFloat(m.montoTotal || 0), 0);

      const ingresoTotal = totalPagos + multasRecaudadas;

      // Tickets completados
      const ticketsCompletados = ticketsArray.filter((t: any) => t.fechaSalida).length;
      const ingresoPorVehiculo = ticketsCompletados > 0 ? totalPagos / ticketsCompletados : 0;

      return {
        ingresoPorVehiculo: parseFloat(ingresoPorVehiculo.toFixed(2)),
        multasRecaudadas: parseFloat(multasRecaudadas.toFixed(2)),
        ingresoTotal: parseFloat(ingresoTotal.toFixed(2)),
        pagosProcesados: pagosArray.length,
      };
    } catch (error) {
      console.error('Error en getKPIsFinancieros:', error);
      throw new HttpException(
        error.response?.data?.message || error.message || 'Error al calcular KPIs financieros',
        error.response?.status || 500,
      );
    }
  }
}
