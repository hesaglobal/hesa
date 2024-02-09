import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { DataService } from '@app/services/data/data.service';
// import { BardService } from '@bard/angular';
import { SubSink } from 'subsink'
@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tts.component.scss']
})
export class TtsComponent implements OnInit {
  @Input() content: string = 'ਹੈਲੋ ਇਹ ਇੱਕ ਟੈਸਟ ਸੁਨੇਹਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਇਸਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰੋ '
  private subs = new SubSink();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  speak() {
    // debugger
    // this.subs.add(this.dataService.callAPI("post", this.content, "admin/notification/tts").subscribe(res => console.log(res)))
    // const speech = this.bardService.speak(this.content);
    // speech.play();
    // var voices = window.speechSynthesis.getVoices();
    setTimeout(() => {
      console.log(window.speechSynthesis.getVoices());
  }, 500);

    const speech = new SpeechSynthesisUtterance();
    speech.text = this.content;
    speech.lang = 'pb-IN';
    speech.volume = 1; // Volume range: 0-1
    speech.rate = 1; // Speed rate range: 0.1-10
    speech.pitch = 1; // Pitch range: 0-2

    window.speechSynthesis.speak(speech);
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
