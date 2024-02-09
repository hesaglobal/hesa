import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeechToText } from './speechtotext.component';


describe('SpeechToText', () => {
  let component: SpeechToText;
  let fixture: ComponentFixture<SpeechToText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechToText ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechToText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
