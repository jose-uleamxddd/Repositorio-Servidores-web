import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

// Services
import { MultaService } from './services/multa.service';

// Resolvers
import { MultaResolver } from './resolvers/multa.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    // Services
    MultaService,
    // Resolvers
    MultaResolver,
  ],
  exports: [MultaService],
})
export class FinesModule {}
