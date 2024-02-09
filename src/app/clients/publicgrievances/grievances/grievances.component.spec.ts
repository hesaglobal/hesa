import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievancesComponent } from './grievances.component';

describe('GrievancesComponent', () => {
  let component: GrievancesComponent;
  let fixture: ComponentFixture<GrievancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
