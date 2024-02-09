import { Injectable } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidator {
  constructor() { }


  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46 && event.target.value.indexOf('.') !== -1) {
      return false;
    }
    if (charCode > 31 && (charCode != 46 && charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
}
notZero(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode === 48 && event.target.value.length === 0) {
    return false;
  }
  if (charCode == 46 && event.target.value.indexOf('.') !== -1) {
    return false;
  }
  if (charCode > 31 && (charCode != 46 && charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
mobileNumberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode == 43 && event.target.value.length == 0) {
    return true;
  }
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

parse(value: any,time: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1) 
    && (typeof time === 'string') && (time.indexOf(':') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[0]) - 1;
      const date = Number(str[1]);
      const times = time.split(':');
      return new Date(year, month, date, Number(times[0]), Number(times[1]), 0, 0);
    } else if((typeof value === 'string') && value === '') {
      return new Date();
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
  imageOnly(file: any) {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (file && allowedFileTypes.includes(file.type)) {
      return true
    } else {
      console.log('Invalid file type');
      return false
    }
  }
  documentOnly(file: any) {
    const allowedFileTypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]
    if (file && allowedFileTypes.includes(file.type)) {
      return true
    } else {
      console.log('Invalid file type');
      return false
    }
  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  
  videoOnly(file: any) {
    const allowedFileTypes = ["video/mp4", "video/x-m4v", "video/"]
    if (file && allowedFileTypes.includes(file.type)) {
      return true
    } else {
      console.log('Invalid file type');
      return false
    }
  }
  validImages(fileArr){
    const allowedFileTypes = [
      "image/png", "image/jpeg", "image/jpg"
    ];
    let isAllowedType = true;
    for (const file of fileArr) {
      if (file && allowedFileTypes.includes(file.type)) {
        isAllowedType = true;
      } else {
        console.log("Invalid file type:", file.type);
        isAllowedType = false;
      }
    }
    return isAllowedType;
  }
  validFiles(fileArr) {
    const allowedFileTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "video/mp4",
      "video/webm",
      "video/mpeg",
      "audio/mpga",
      "audio/flac",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",

    ];
    let isAllowedType = true;
    for (const file of fileArr) {
      let size = file.size
      const fsize = Math.round((size / 1024));
      if (file && allowedFileTypes.includes(file.type) && fsize <= 4096) {
        isAllowedType = true;
      } else {
        console.log("Invalid file type:", file.type);
        isAllowedType = false;
      }
    }
    return isAllowedType;
  }
  audioOnly(fileArr) {
    const allowedFileTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "video/mp4",
      "video/webm",
      "video/mpeg",
      "audio/mpga",
      "audio/flac",
    ];
    let isAllowedType = true;
    for (const file of fileArr) {
      let size = file.size
      const fsize = Math.round((size / 1024));
      if (file && allowedFileTypes.includes(file.type) && fsize <= 4096) {
        isAllowedType = true;
      } else {
        console.log("Invalid file type:", file.type);
        isAllowedType = false;
      }
    }
    return isAllowedType;
  }
  getFileType(fileName){
    const fileExtension = fileName.split('.').pop().toLowerCase();

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const audioExtensions = ['mp3', 'wav', 'flac', 'ogg','mp4','webm','mpeg','mpga'];

    if (imageExtensions.includes(fileExtension)) {
      return 'image';
    } else if (audioExtensions.includes(fileExtension)) {
      return 'audio';
    } else {
      return 'unknown';
    }
  }
  alphanumericOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    
    if ((charCode >= 48 && charCode <= 57) || 
        (charCode >= 65 && charCode <= 90) || 
        (charCode >= 97 && charCode <= 122)) { 
      return true;
    }
  
    return false;
  }
  
}
