import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateAdministradorInput } from '../dto/create-administrador.input';
import { UpdateAdministradorInput } from '../dto/update-administrador.input';
import { Administrador } from '../entities/administrador.entity';

@Injectable()
export class AdministradorService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/administradores`;
  }

  async create(createAdministradorInput: CreateAdministradorInput): Promise<Administrador> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createAdministradorInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear administrador',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Administrador[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener administradores',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Administrador> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener administrador',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateAdministradorInput: UpdateAdministradorInput): Promise<Administrador> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateAdministradorInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar administrador',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Administrador> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar administrador',
        error.response?.status || 500,
      );
    }
  }
}
