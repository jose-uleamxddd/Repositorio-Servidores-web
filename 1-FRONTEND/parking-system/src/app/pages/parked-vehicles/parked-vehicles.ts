import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Parking, Vehicle } from '../../services/parking';

@Component({
  selector: 'app-parked-vehicles',
  imports: [CommonModule],
  templateUrl: './parked-vehicles.html',
  styleUrl: './parked-vehicles.css',
})
export class ParkedVehicles implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  showExitModal = false;

  constructor(private parkingService: Parking) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicles = this.parkingService.getParkedVehicles();
  }

  openExitModal(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showExitModal = true;
  }

  closeExitModal() {
    this.showExitModal = false;
    this.selectedVehicle = null;
  }

  exitVehicle() {
    if (this.selectedVehicle) {
      this.parkingService.exitVehicle(this.selectedVehicle.id);
      this.closeExitModal();
      this.loadVehicles();
    }
  }

  getTimeParked(entryTime: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(entryTime).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
}
