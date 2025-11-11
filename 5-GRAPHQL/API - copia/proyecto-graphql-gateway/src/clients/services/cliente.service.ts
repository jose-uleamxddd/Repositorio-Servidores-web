import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateClienteInput } from '../dto/create-cliente.input';
import { UpdateClienteInput } from '../dto/update-cliente.input';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/clientes`;
  }

  async create(createClienteInput: CreateClienteInput): Promise<Cliente> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createClienteInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear cliente',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener clientes',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Cliente> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener cliente',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateClienteInput: UpdateClienteInput): Promise<Cliente> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateClienteInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar cliente',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Cliente> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar cliente',
        error.response?.status || 500,
      );
    }
  }
}
