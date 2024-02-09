import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemWithAIComponent } from './additemwithai.component';

describe('AddItemWithAIComponent', () => {
  let component: AddItemWithAIComponent;
  let fixture: ComponentFixture<AddItemWithAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemWithAIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemWithAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});