import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreatePagoInput } from '../dto/create-pago.input';
import { UpdatePagoInput } from '../dto/update-pago.input';
import { Pago } from '../entities/pago.entity';

@Injectable()
export class PagoService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/pagos`;
  }

  async create(createPagoInput: CreatePagoInput): Promise<Pago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createPagoInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear pago',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Pago[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener pagos',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Pago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener pago',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updatePagoInput: UpdatePagoInput): Promise<Pago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updatePagoInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar pago',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Pago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar pago',
        error.response?.status || 500,
      );
    }
  }
}
