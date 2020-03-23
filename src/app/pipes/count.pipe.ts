import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: any[], key: string, id: number): number {

    console.log('count pipe');

    return value.reduce((acc: number, cv: any) => {

      if (cv[key].findIndex((nestedItem: any) => nestedItem.id === id) !== -1) {
        return acc + 1;
      } else {
        return acc;
      }

    }, 0);

  }

}
