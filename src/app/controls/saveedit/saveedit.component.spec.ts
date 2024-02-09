import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveeditComponent } from './saveedit.component';

describe('SaveeditComponent', () => {
  let component: SaveeditComponent;
  let fixture: ComponentFixture<SaveeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
