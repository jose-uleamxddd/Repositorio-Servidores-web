import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketInput } from '../dto/create-ticket.input';
import { UpdateTicketInput } from '../dto/update-ticket.input';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation(() => Ticket)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ): Promise<Ticket> {
    return this.ticketService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ): Promise<Ticket> {
    return this.ticketService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => ID }) id: string): Promise<Ticket> {
    return this.ticketService.remove(id);
  }
}
