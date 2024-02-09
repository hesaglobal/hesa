import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Pipe({ name: 'ngbdateformat' })
export class NgbdateformatPipe implements PipeTransform {
  transform(value: NgbDate, format: string = 'MMM DD YYYY'): string {
    if(!value) return ''
    if(value.year && value.month && value.day){
      let newMoment = moment(value.year+ '-'+ value.month+ '-' + value.day);
      if (newMoment.isValid()) {
        return newMoment.format(format);
      } else {
        return '';
      }
    } else {
      let newMoment = moment(value);
      if (newMoment.isValid()) {
        return newMoment.format(format);
      } else {
        return '';
      }
    }

  }
}
