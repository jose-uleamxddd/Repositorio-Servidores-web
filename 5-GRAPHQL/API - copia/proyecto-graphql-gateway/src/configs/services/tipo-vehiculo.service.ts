import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateTipoVehiculoInput } from '../dto/create-tipo-vehiculo.input';
import { UpdateTipoVehiculoInput } from '../dto/update-tipo-vehiculo.input';
import { TipoVehiculo } from '../entities/tipo-vehiculo.entity';

@Injectable()
export class TipoVehiculoService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/tipo-vehiculo`;
  }

  async create(createTipoVehiculoInput: CreateTipoVehiculoInput): Promise<TipoVehiculo> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createTipoVehiculoInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear tipo de vehículo',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<TipoVehiculo[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tipos de vehículo',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<TipoVehiculo> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tipo de vehículo',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateTipoVehiculoInput: UpdateTipoVehiculoInput): Promise<TipoVehiculo> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateTipoVehiculoInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar tipo de vehículo',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<TipoVehiculo> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar tipo de vehículo',
        error.response?.status || 500,
      );
    }
  }
}
