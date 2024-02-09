import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileType' })
export class FileTypePipe implements PipeTransform {
  transform(fileName: string): string {
    if (!fileName) return 'Unknown';

    const fileExtension = fileName.split('.').pop().toLowerCase();

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const audioExtensions = ['mp3', 'wav', 'flac', 'ogg','mp4','webm','mpeg','mpga'];

    if (imageExtensions.includes(fileExtension)) {
      return 'Image';
    } else if (audioExtensions.includes(fileExtension)) {
      return 'Audio';
    } else {
      return 'Unknown';
    }
  }
}
