import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PagoService } from './services/pago.service';
import { DetallePagoService } from './services/detalle-pago.service';
import { PagoResolver } from './resolvers/pago.resolver';
import { DetallePagoResolver } from './resolvers/detalle-pago.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    PagoResolver,
    DetallePagoResolver,
    PagoService,
    DetallePagoService,
  ],
})
export class TransactionsModule {}
