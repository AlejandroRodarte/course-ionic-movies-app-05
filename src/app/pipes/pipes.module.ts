import { NgModule } from '@angular/core';
import { ImagesPipe } from './images.pipe';
import { PairsPipe } from './pairs.pipe';

@NgModule({
  declarations: [ImagesPipe, PairsPipe],
  exports: [ImagesPipe, PairsPipe]
})
export class PipesModule { }
