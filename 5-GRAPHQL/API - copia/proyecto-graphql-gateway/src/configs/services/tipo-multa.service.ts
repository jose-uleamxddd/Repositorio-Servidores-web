import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateTipoMultaInput } from '../dto/create-tipo-multa.input';
import { UpdateTipoMultaInput } from '../dto/update-tipo-multa.input';
import { TipoMulta } from '../entities/tipo-multa.entity';

@Injectable()
export class TipoMultaService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/tipo-multa`;
  }

  async create(createTipoMultaInput: CreateTipoMultaInput): Promise<TipoMulta> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createTipoMultaInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear tipo de multa',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<TipoMulta[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tipos de multa',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<TipoMulta> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tipo de multa',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateTipoMultaInput: UpdateTipoMultaInput): Promise<TipoMulta> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateTipoMultaInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar tipo de multa',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<TipoMulta> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar tipo de multa',
        error.response?.status || 500,
      );
    }
  }
}
