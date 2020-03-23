import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFilter'
})
export class ImageFilterPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.filter(item => item.backdrop_path);
  }

}
