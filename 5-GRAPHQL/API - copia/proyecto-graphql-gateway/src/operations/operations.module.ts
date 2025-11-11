import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TicketService } from './services/ticket.service';
import { TicketResolver } from './resolvers/ticket.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [TicketResolver, TicketService],
})
export class OperationsModule {}
