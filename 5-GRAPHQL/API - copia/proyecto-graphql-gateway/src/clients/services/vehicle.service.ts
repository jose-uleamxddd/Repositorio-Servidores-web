import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateVehicleInput } from '../dto/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/update-vehicle.input';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class VehicleService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('REST_API_URL')}/vehiculos`;
  }

  async create(createVehicleInput: CreateVehicleInput): Promise<Vehicle> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, createVehicleInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear vehículo',
        error.response?.status || 500,
      );
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.apiUrl));
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener vehículos',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<Vehicle> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener vehículo',
        error.response?.status || 500,
      );
    }
  }

  async update(id: string, updateVehicleInput: UpdateVehicleInput): Promise<Vehicle> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.apiUrl}/${id}`, updateVehicleInput),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al actualizar vehículo',
        error.response?.status || 500,
      );
    }
  }

  async remove(id: string): Promise<Vehicle> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al eliminar vehículo',
        error.response?.status || 500,
      );
    }
  }
}
