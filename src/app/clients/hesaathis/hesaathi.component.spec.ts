import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HesaathiComponent } from './hesaathi.component';

describe('HesaathiComponent', () => {
  let component: HesaathiComponent;
  let fixture: ComponentFixture<HesaathiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HesaathiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HesaathiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
