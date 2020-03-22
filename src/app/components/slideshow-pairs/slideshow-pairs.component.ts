import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input()
  public movies: Movie[] = [];

  @Output()
  public loadMoreMovies = new EventEmitter<void>();

  public disableNextPageButton = this.movieService.pageTracker.popular.onLastPage;

  public slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor(
    private movieService: MoviesService
  ) { }

  ngOnInit() {}

  onClick(): void {
    this.loadMoreMovies.emit();
  }

}
