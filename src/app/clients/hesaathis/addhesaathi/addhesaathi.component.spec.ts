import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHesaathiComponent } from './addhesaathi.component';

describe('AddHesaathiComponent', () => {
  let component: AddHesaathiComponent;
  let fixture: ComponentFixture<AddHesaathiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHesaathiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHesaathiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
