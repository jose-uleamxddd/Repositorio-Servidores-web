import { Ticket } from "../ticket";

export class TicketCRUD {
  tickets: Ticket[] = [];

  create(ticket: Ticket): Ticket {
    this.tickets.push(ticket);
    return ticket;
  }

  read(uuid: string): Ticket | undefined {
    return this.tickets.find(t => t.uuid === uuid);
  }

  update(uuid: string, nuevoTicket: Ticket): Ticket | undefined {
    const index = this.tickets.findIndex(t => t.uuid === uuid);
    if (index === -1) return undefined;

    this.tickets[index] = nuevoTicket;
    return nuevoTicket;
  }

  delete(uuid: string): boolean {
    const index = this.tickets.findIndex(t => t.uuid === uuid);
    if (index === -1) return false;

    this.tickets.splice(index, 1);
    return true;
  }
}