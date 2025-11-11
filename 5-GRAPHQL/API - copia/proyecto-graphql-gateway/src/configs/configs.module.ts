import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// Services
import { TipoVehiculoService } from './services/tipo-vehiculo.service';
import { TipoTarifaService } from './services/tipo-tarifa.service';
import { TipoMultaService } from './services/tipo-multa.service';

// Resolvers
import { TipoVehiculoResolver } from './resolvers/tipo-vehiculo.resolver';
import { TipoTarifaResolver } from './resolvers/tipo-tarifa.resolver';
import { TipoMultaResolver } from './resolvers/tipo-multa.resolver';

@Module({
  imports: [HttpModule, NestConfigModule],
  providers: [
    // Services
    TipoVehiculoService,
    TipoTarifaService,
    TipoMultaService,
    // Resolvers
    TipoVehiculoResolver,
    TipoTarifaResolver,
    TipoMultaResolver,
  ],
  exports: [TipoVehiculoService, TipoTarifaService, TipoMultaService],
})
export class ConfigsModule {}
