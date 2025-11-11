import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkedVehicles } from './parked-vehicles';

describe('ParkedVehicles', () => {
  let component: ParkedVehicles;
  let fixture: ComponentFixture<ParkedVehicles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkedVehicles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkedVehicles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
