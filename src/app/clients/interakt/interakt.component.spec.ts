import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraktComponent } from './interakt.component';

describe('InteraktComponent', () => {
  let component: InteraktComponent;
  let fixture: ComponentFixture<InteraktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteraktComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteraktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
