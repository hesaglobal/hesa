import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMessageComponent } from './uploadmessage.component';

describe('UploadMessageComponent', () => {
  let component: UploadMessageComponent;
  let fixture: ComponentFixture<UploadMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
