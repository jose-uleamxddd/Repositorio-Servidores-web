import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateSeccionInput } from '../dto/create-seccion.input';
import { UpdateSeccionInput } from '../dto/update-seccion.input';
import { Seccion } from '../entities/seccion.entity';

@Injectable()
export class SeccionService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/secciones`;
  }

  async create(createSeccionInput: CreateSeccionInput): Promise<Seccion> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createSeccionInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear sección',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Seccion[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener secciones',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Seccion> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener sección',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateSeccionInput: UpdateSeccionInput): Promise<Seccion> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateSeccionInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar sección',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Seccion> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar sección',
        error.response?.status || 500,
      );
    }
  }
}
