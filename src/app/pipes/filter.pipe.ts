import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], key: string, id: number): any[] {
    console.log('filter pipe');
    return arr.filter(item => item[key].findIndex((nestedItem: any) => nestedItem.id === id) !== -1);
  }

}
