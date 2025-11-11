import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateDetallePagoInput } from '../dto/create-detalle-pago.input';
import { UpdateDetallePagoInput } from '../dto/update-detalle-pago.input';
import { DetallePago } from '../entities/detalle-pago.entity';

@Injectable()
export class DetallePagoService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/detalle-pago`;
  }

  async create(createDetallePagoInput: CreateDetallePagoInput): Promise<DetallePago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createDetallePagoInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear detalle de pago',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<DetallePago[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener detalles de pago',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<DetallePago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener detalle de pago',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateDetallePagoInput: UpdateDetallePagoInput): Promise<DetallePago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateDetallePagoInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar detalle de pago',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<DetallePago> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar detalle de pago',
        error.response?.status || 500,
      );
    }
  }
}
