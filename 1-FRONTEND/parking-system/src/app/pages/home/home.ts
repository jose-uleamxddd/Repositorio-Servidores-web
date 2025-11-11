import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Parking } from '../../services/parking';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  stats = {
    currentVehicles: 0,
    totalVehicles: 0,
    availableSpots: 0,
    totalRevenue: 0
  };

  constructor(private parkingService: Parking) {}

  ngOnInit() {
    this.stats = this.parkingService.getStatistics();
  }
}
