import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [AnalyticsResolver, AnalyticsService],
})
export class AnalyticsModule {}
