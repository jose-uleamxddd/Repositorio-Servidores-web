import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

// Services
import { ClienteService } from './services/cliente.service';
import { AdministradorService } from './services/administrador.service';
import { VehicleService } from './services/vehicle.service';

// Resolvers
import { ClienteResolver } from './resolvers/cliente.resolver';
import { AdministradorResolver } from './resolvers/administrador.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    // Services
    ClienteService,
    AdministradorService,
    VehicleService,
    // Resolvers
    ClienteResolver,
    AdministradorResolver,
    VehicleResolver,
  ],
  exports: [ClienteService, AdministradorService, VehicleService],
})
export class ClientsModule {}
