import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateTicketInput } from '../dto/create-ticket.input';
import { UpdateTicketInput } from '../dto/update-ticket.input';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class TicketService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/tickets`;
  }

  async create(createTicketInput: CreateTicketInput): Promise<Ticket> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createTicketInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear ticket',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Ticket[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tickets',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Ticket> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener ticket',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateTicketInput: UpdateTicketInput): Promise<Ticket> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateTicketInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar ticket',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Ticket> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar ticket',
        error.response?.status || 500,
      );
    }
  }
}
