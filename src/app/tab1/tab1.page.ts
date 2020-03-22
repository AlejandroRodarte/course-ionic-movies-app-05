import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie, MovieDbResponse } from '../interfaces/interfaces';

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
    this.movieService.getPopularMovies().subscribe((response: MovieDbResponse) => this.popularMovies = response.results);
  }

}
