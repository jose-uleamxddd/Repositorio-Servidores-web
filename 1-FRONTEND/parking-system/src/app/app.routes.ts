import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { VehicleEntry } from './pages/vehicle-entry/vehicle-entry';
import { ParkedVehicles } from './pages/parked-vehicles/parked-vehicles';
import { History } from './pages/history/history';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'entry', component: VehicleEntry },
  { path: 'parked', component: ParkedVehicles },
  { path: 'history', component: History },
  { path: '**', redirectTo: '' }
];
