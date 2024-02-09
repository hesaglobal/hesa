import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopopoverComponent } from './videopopover.component';

describe('VideopopoverComponent', () => {
  let component: VideopopoverComponent;
  let fixture: ComponentFixture<VideopopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideopopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
