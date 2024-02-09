import { Component, NgZone,EventEmitter,Output,Input,OnChanges, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data/data.service';
import { SubSink } from 'subsink';
import { ToastService } from '@app/services/toast';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-speechtotext',
  templateUrl: './speechtotext.component.html',
  styleUrls: ['./speechtotext.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpeechToText),
      multi: true,
    },
  ],
})
export class SpeechToText implements ControlValueAccessor{
  private subs = new SubSink()
  @Output() onAudioGeneration = new EventEmitter<any>();
  @Input() shouldReset:Boolean=false
  @Input() customClass:any=''
  audioStopped : Boolean=false
  audioStarted:Boolean=false
  recognizedText: string = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
  recognition: any;
  isListening:Boolean=false;
  audioURL:any
  formData = new FormData();
  audioChunks: any[] = [];
  audioRecorder: any;
  constructor(private zone: NgZone,public dataservice: DataService, private alert: ToastService,private router: Router) {
    if(this.shouldReset){
      this.audioURL = null;
      this.audioChunks = [];
      this.formData.delete('audio')
    }
  }
  ngOnInit(): void {

     
  }
  writeValue(value: any): void {
   
  }

  startSpeechRecognition() {
    this.isListening=true;
    this.audioStarted=true
    this.audioURL=''
    this.audioStopped=false;
    this.recognition = new webkitSpeechRecognition();
    this.recordSoundAnimation();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    let self = this
    this.recognition.onresult = (event: any) => {
      this.zone.run(() => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        this.recognizedText = transcript;
      });
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream: MediaStream) => {
          this.audioRecorder = new MediaRecorder(stream);

          this.audioRecorder.ondataavailable = (event: any) => {
            
            if (event.data.size > 0) {
              self.audioChunks.push(event.data);
            }
          };

          this.audioRecorder.onstop = () => {
            const completeAudioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            const reader = new FileReader();
            reader.onload = (event: any) => {
              const dataUrl = event.target.result;
              this.zone.run(() => {
                this.audioURL = dataUrl;
              });
            };
      
            reader.readAsDataURL(completeAudioBlob);
      
            this.formData.append('audio', completeAudioBlob, 'audio.wav');
          };

          this.audioRecorder.start();
        })
        .catch(error => {
          console.error('Error accessing user media:', error);
        });
    }
    this.recognition.start();
  }
  stopSpeechRecognition() {
    this.audioStopped=true;
    this.audioStarted=false;
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
      if (this.audioRecorder) {
        this.audioRecorder.stop();
      }
      setTimeout(()=>{
        this.submit();
      },500)
    }
  }
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
  recordAgain() {
    this.audioURL = null;
    this.audioChunks = [];
    this.formData.delete('audio');
  }
  submit(){
    this.onAudioGeneration.emit(this.formData);
  }
  recordSoundAnimation(){
    const bar = document.querySelectorAll(".bar");
      for (let i = 0; i < bar.length; i++) {
        bar.forEach((item:HTMLElement, j) => {
          item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`; 
        });
      }
  }
}

