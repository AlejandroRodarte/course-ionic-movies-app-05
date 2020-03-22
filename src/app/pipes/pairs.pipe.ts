import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pairs'
})
export class PairsPipe implements PipeTransform {

  transform(arr: any[]): any[][] {

    const pairs: any[][] = [];

    for (let i = 0; i < arr.length; i += 2) {

      const pair: any[] = [];

      pair.push(arr[i]);

      if (i + 1 !== arr.length) {
        pair.push(arr[i + 1]);
      }

      pairs.push(pair);

    }

    return pairs;

  }

}
