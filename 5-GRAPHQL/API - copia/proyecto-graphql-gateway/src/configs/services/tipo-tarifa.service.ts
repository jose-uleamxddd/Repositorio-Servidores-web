import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateTipoTarifaInput } from '../dto/create-tipo-tarifa.input';
import { UpdateTipoTarifaInput } from '../dto/update-tipo-tarifa.input';
import { TipoTarifa } from '../entities/tipo-tarifa.entity';

@Injectable()
export class TipoTarifaService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/tipo-tarifa`;
  }

  async create(createTipoTarifaInput: CreateTipoTarifaInput): Promise<TipoTarifa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createTipoTarifaInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear tipo de tarifa',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<TipoTarifa[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tipos de tarifa',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<TipoTarifa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tipo de tarifa',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateTipoTarifaInput: UpdateTipoTarifaInput): Promise<TipoTarifa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateTipoTarifaInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar tipo de tarifa',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<TipoTarifa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar tipo de tarifa',
        error.response?.status || 500,
      );
    }
  }
}
