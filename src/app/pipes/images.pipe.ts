import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(image: string, size: string = 'w500'): string {

    if (!image) {
      return './assets/no-image-banner.jpg';
    }

    return `${environment.imageRepoUrl}/${size}${image}`;

  }

}
