import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { MovieDetails, Genre, MovieByGenre } from '../interfaces/interfaces';
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

  public moviesByGenre: MovieByGenre[] = [];

  private movieSub: Subscription;

  private genreSub: Subscription;

  constructor(
    private dataLocalService: DataLocalService,
    private movieService: MoviesService
  ) {}

  ngOnInit() {

    this.movieDetails = this.dataLocalService.getMovies();

    this.movieSub = this.dataLocalService.moviesChanged.subscribe(() => {
      this.movieDetails = this.dataLocalService.getMovies();
      this.orderMoviesByGenre();
    });

    this.genres = this.movieService.fetchGenres();

    this.genreSub = this.movieService.genresChanged.subscribe(() => {
      this.genres = this.movieService.fetchGenres();
      this.orderMoviesByGenre();
    });

  }

  private orderMoviesByGenre(): void {

    const moviesByGenre: MovieByGenre[] = [];

    this.genres.forEach((genre: Genre) => {

      const movies: MovieDetails[] = [];

      this.movieDetails.forEach((movieDetail: MovieDetails) => {

        if (movieDetail.genres.findIndex((movieGenre: Genre) => genre.id === movieGenre.id) !== -1) {
          movies.push(movieDetail);
        }

      });

      moviesByGenre.push({
        genre: genre.name,
        movies
      });

    });

    this.moviesByGenre = moviesByGenre;

  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
    this.genreSub.unsubscribe();
  }

}
