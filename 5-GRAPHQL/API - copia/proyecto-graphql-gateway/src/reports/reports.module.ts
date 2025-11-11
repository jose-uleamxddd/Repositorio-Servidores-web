import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ReportsService } from './services/reports.service';
import { ReportsResolver } from './resolvers/reports.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ReportsService, ReportsResolver],
})
export class ReportsModule {}
