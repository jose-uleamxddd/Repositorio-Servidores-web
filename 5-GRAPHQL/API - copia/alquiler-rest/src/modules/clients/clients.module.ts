import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Vehicle } from './entities/vehiculo.entity';
import { Administrador } from './entities/administrador.entity';
import { ClienteService } from './services/cliente.service';
import { VehicleService } from './services/vehicle.service';
import { AdministradorService } from './services/administrador.service';
import { ClienteController } from './controllers/cliente.controller';
import { VehicleController } from './controllers/vehicle.controller';
import { AdministradorController } from './controllers/administrador.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente, Vehicle, Administrador]),
    ConfigModule, // Solo para TipoVehiculoService
  ],
  controllers: [ClienteController, VehicleController, AdministradorController],
  providers: [ClienteService, VehicleService, AdministradorService],
  exports: [ClienteService, VehicleService, AdministradorService],
})
export class ClientsModule {}