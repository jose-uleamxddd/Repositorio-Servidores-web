import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateMultaInput } from '../dto/create-multa.input';
import { UpdateMultaInput } from '../dto/update-multa.input';
import { Multa } from '../entities/multa.entity';

@Injectable()
export class MultaService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/multas`;
  }

  async create(createMultaInput: CreateMultaInput): Promise<Multa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createMultaInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear multa',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Multa[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener multas',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Multa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener multa',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateMultaInput: UpdateMultaInput): Promise<Multa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateMultaInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar multa',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Multa> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar multa',
        error.response?.status || 500,
      );
    }
  }
}
