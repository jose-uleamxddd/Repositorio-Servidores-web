import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Parking } from '../../services/parking';

@Component({
  selector: 'app-vehicle-entry',
  imports: [FormsModule],
  templateUrl: './vehicle-entry.html',
  styleUrl: './vehicle-entry.css',
})
export class VehicleEntry {
  vehicle = {
    licensePlate: '',
    owner: '',
    vehicleType: 'sedan',
    parkingSpot: 1
  };

  submitted = false;
  message = '';

  constructor(
    private parkingService: Parking,
    private router: Router
  ) {}

  onSubmit() {
    if (this.vehicle.licensePlate && this.vehicle.owner) {
      this.parkingService.registerVehicle(this.vehicle);
      this.submitted = true;
      this.message = `Vehículo ${this.vehicle.licensePlate} registrado exitosamente!`;
      
      setTimeout(() => {
        this.router.navigate(['/parked']);
      }, 2000);
    }
  }

  resetForm() {
    this.vehicle = {
      licensePlate: '',
      owner: '',
      vehicleType: 'sedan',
      parkingSpot: 1
    };
    this.submitted = false;
    this.message = '';
  }
}
