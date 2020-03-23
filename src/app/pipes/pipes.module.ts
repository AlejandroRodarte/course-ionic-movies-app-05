import { NgModule } from '@angular/core';
import { ImagesPipe } from './images.pipe';
import { PairsPipe } from './pairs.pipe';
import { FilterPipe } from './filter.pipe';
import { CountPipe } from './count.pipe';
import { ImageFilterPipe } from './image-filter.pipe';

@NgModule({
  declarations: [ImagesPipe, PairsPipe, FilterPipe, CountPipe, ImageFilterPipe],
  exports: [ImagesPipe, PairsPipe, FilterPipe, CountPipe, ImageFilterPipe]
})
export class PipesModule { }
