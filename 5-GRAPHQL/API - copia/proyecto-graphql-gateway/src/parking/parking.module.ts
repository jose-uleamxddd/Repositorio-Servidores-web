import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { EspacioService } from './services/espacio.service';
import { SeccionService } from './services/seccion.service';
import { EspacioResolver } from './resolvers/espacio.resolver';
import { SeccionResolver } from './resolvers/seccion.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    EspacioResolver,
    SeccionResolver,
    EspacioService,
    SeccionService,
  ],
})
export class ParkingModule {}
