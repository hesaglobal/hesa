import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SellerComponent } from './sellers.component';

SellerComponent
describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
