import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Parking, Vehicle } from '../../services/parking';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {
  history: Vehicle[] = [];

  constructor(private parkingService: Parking) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.parkingService.getHistory();
  }

  getDuration(entryTime: Date, exitTime?: Date): string {
    if (!exitTime) return 'N/A';
    const diff = new Date(exitTime).getTime() - new Date(entryTime).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  getTotalRevenue(): number {
    return this.history.reduce((sum, v) => sum + (v.fee || 0), 0);
  }
}
