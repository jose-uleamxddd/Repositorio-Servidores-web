import { Resolver, Query } from '@nestjs/graphql';
import { ReportsService } from '../services/reports.service';
import { ReporteOcupacion } from '../entities/reporte-ocupacion.entity';
import { ReporteIngresos } from '../entities/reporte-ingresos.entity';
import { ReporteMultas } from '../entities/reporte-multas.entity';

@Resolver()
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Query(() => ReporteOcupacion, {
    name: 'reporteOcupacion',
    description:
      'Dashboard de ocupación del estacionamiento. Combina datos de Secciones, Espacios y Tickets activos.',
  })
  getReporteOcupacion(): Promise<ReporteOcupacion> {
    return this.reportsService.getReporteOcupacion();
  }

  @Query(() => ReporteIngresos, {
    name: 'reporteIngresos',
    description:
      'Reporte financiero de ingresos por tipo de tarifa. Combina datos de TiposTarifa, Pagos y DetallePago.',
  })
  getReporteIngresos(): Promise<ReporteIngresos> {
    return this.reportsService.getReporteIngresos();
  }

  @Query(() => ReporteMultas, {
    name: 'reporteMultas',
    description:
      'Reporte de multas y vehículos infractores con estadísticas. Combina datos de Multas, TipoMulta y DetallePago.',
  })
  getReporteMultas(): Promise<ReporteMultas> {
    return this.reportsService.getReporteMultas();
  }
}
