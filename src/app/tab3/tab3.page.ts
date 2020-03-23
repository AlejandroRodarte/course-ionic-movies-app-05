import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { MovieDetails, Genre } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {

  public movieDetails: MovieDetails[] = [];

  public genres: Genre[] = [];

  private movieSub: Subscription;

  private genreSub: Subscription;

  constructor(
    private dataLocalService: DataLocalService,
    private movieService: MoviesService
  ) {}

  ngOnInit() {

    this.movieDetails = this.dataLocalService.getMovies();
    this.movieSub = this.dataLocalService.moviesChanged.subscribe(() => this.movieDetails = this.dataLocalService.getMovies());

    this.genres = this.movieService.fetchGenres();
    this.genreSub = this.movieService.genresChanged.subscribe(() => this.genres = this.movieService.fetchGenres());

  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
    this.genreSub.unsubscribe();
  }

}
