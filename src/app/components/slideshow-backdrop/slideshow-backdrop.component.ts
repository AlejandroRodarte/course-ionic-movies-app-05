import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input()
  public movies: Movie[] = [];

  public slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };

  constructor() { }

  ngOnInit() {}

}
