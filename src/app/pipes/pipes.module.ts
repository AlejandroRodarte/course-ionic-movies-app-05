import { NgModule } from '@angular/core';
import { ImagesPipe } from './images.pipe';
import { PairsPipe } from './pairs.pipe';
import { FilterPipe } from './filter.pipe';
import { CountPipe } from './count.pipe';

@NgModule({
  declarations: [ImagesPipe, PairsPipe, FilterPipe, CountPipe],
  exports: [ImagesPipe, PairsPipe, FilterPipe, CountPipe]
})
export class PipesModule { }
