import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie, MovieDbResponse } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public featuredMovies: Movie[] = [];
  public popularMovies: Movie[] = [];

  constructor(
    private movieService: MoviesService
  ) {}

  ngOnInit() {
    this.movieService.getFeaturedMovies().subscribe((response: MovieDbResponse) => this.featuredMovies = response.results);
    this.getPopularMovies();
  }

  onLoadMoreMovies(): void {
    this.getPopularMovies();
  }

  private getPopularMovies(): void {
    this.movieService.getPopularMovies().pipe(tap((response: MovieDbResponse) => {
      const newArr = [...this.popularMovies, ...response.results];
      this.popularMovies = newArr;
    })).subscribe();
  }

}
