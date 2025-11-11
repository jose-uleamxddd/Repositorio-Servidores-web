import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateEspacioInput } from '../dto/create-espacio.input';
import { UpdateEspacioInput } from '../dto/update-espacio.input';
import { Espacio } from '../entities/espacio.entity';

@Injectable()
export class EspacioService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/espacios`;
  }

  async create(createEspacioInput: CreateEspacioInput): Promise<Espacio> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createEspacioInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear espacio',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Espacio[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener espacios',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Espacio> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener espacio',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateEspacioInput: UpdateEspacioInput): Promise<Espacio> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateEspacioInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar espacio',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Espacio> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar espacio',
        error.response?.status || 500,
      );
    }
  }
}
