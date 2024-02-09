import { Injectable } from '@angular/core'
import Swal from 'sweetalert2'
export enum TYPE {
  ERROR='error',
  SUCCESS='success',
  WARNING='warning',
  INFO='info',
  QUESTION='question'
}

@Injectable({
  providedIn: "root"
})
export class ToastService{

  reports = [{text:"Uncivil or unkind"},{text:"Spam"},{text:"Soliciting"},{text:"Offensive"},{text:"Something else"}];
  constructor() { }
  toast(title:string, typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 4000,
      title: title
    })
  }

  reviewStatus(){
    return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Accept',
      denyButtonText: `Reject`,
    })
  }

  errorStatus(title:string, typeIcon = TYPE.ERROR, timerProgressBar: boolean = false){
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 4000,
      title: title
    })
  }

}