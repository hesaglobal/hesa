import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { Subject, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import Globalkeys from '@app/globalkeys'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  @Input() value: string;
  @Input() clearSearchBar: Subject<boolean>
  @Input() onSearchAction: any
  @Input() onSelectAction: any
  @Input() placeholder: string = 'Search'
  public searchtext: string = ''
  oldsearch: string = ''
  keyIndex: number = -1;


  model = {
    list: [],
    showResults: false
  }

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    let self = this
    this.clearSearchBar.subscribe(v => {
      if (v) {
        this.value = ''
        this.clearSearch(true, true)
      }
    })

    Globalkeys.addHandler('search', 101, this.handleArrowKeys.bind(self))
  }

  ngOnDestroy() {
    Globalkeys.removeHandler('search')
  }

  navigate(item) {
    this.value = item.value
    if(this.onSelectAction){
      this.onSelectAction(item.key)
      this.model.showResults = false
    }
  }

  handleArrowKeys(event) {
    let key = event.keyCode
    let results = this.model.list
    let selectedIndex = results.findIndex(item => item.selected)
    let resultCount = results.length
    let initial = false
    if (selectedIndex < 0) {
      selectedIndex = 0
      initial = true
    }

    // Up arrow key
    if (key === 38) {
      if (initial) {
        results[0].selected = true
        initial = false
      } else if (selectedIndex === 0) {
        results[0].selected = false
        results[resultCount - 1].selected = true
      } else {
        results[selectedIndex - 1].selected = true
        results[selectedIndex].selected = false
      }
      return true
    }

    // Down arrow Key
    if (key === 40) {
      if (initial) {
        results[0].selected = true
        initial = false
      } else if (selectedIndex < resultCount - 1) {
        results[selectedIndex].selected = false
        results[selectedIndex + 1].selected = true
      } else {
        results[selectedIndex].selected = false
        results[0].selected = true
      }
      return true
    }

    if (key === 13 && selectedIndex !== -1) {
      let item = results[selectedIndex]
      selectedIndex = 0
      this.navigate(item)
      return true
    }
  }


  clearSearch(setfocus = false, cleartext = false) {
    this.oldsearch = ''
    this.model.list = []
    this.keyIndex = -1
    this.searchtext = this.value
    if (cleartext === true) {
      this.searchtext = ''
    }
  }

  search(key) {
    if (key.which === 27 || key.which === 9) {
      this.clearSearch(false, true)
    }

    if (this.searchtext === this.oldsearch) {
      return
    }

    if (this.searchtext.length >= 2) {
      this.onSearchAction(this.searchtext)
        .pipe(
          map(result => {
            this.oldsearch = this.searchtext
            this.model.list = result['data']['list']
            this.model.showResults = true
          }),
          catchError(() => {
            return of(false)
          })
        )
        .subscribe()
    }
  }
  onBlur(){
    let self = this
    setTimeout(function () {
      self.model.list = []
    }, 400)
  }
}