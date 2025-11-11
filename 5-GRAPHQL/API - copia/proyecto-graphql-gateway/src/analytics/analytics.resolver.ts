import { Resolver, Query } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';
import { MetricasEstacionamiento } from './entities/metricas-estacionamiento.entity';
import { EstadisticasTiempo } from './entities/estadisticas-tiempo.entity';
import { KPIsFinancieros } from './entities/kpis-financieros.entity';

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => MetricasEstacionamiento, {
    name: 'metricasEstacionamiento',
    description:
      'Métricas operativas del estacionamiento: vehículos atendidos, tiempo promedio de estadía, tasa de rotación y clientes activos.',
  })
  getMetricasEstacionamiento(): Promise<MetricasEstacionamiento> {
    return this.analyticsService.getMetricasEstacionamiento();
  }

  @Query(() => EstadisticasTiempo, {
    name: 'estadisticasTiempo',
    description:
      'Estadísticas de tiempo de los tickets completados: promedio, máximo, mínimo y cantidad total.',
  })
  getEstadisticasTiempo(): Promise<EstadisticasTiempo> {
    return this.analyticsService.getEstadisticasTiempo();
  }

  @Query(() => KPIsFinancieros, {
    name: 'kpisFinancieros',
    description:
      'KPIs financieros del estacionamiento: ingreso por vehículo, multas recaudadas, ingreso total y pagos procesados.',
  })
  getKPIsFinancieros(): Promise<KPIsFinancieros> {
    return this.analyticsService.getKPIsFinancieros();
  }
}
