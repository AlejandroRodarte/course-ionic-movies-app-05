import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetails, MovieActors } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input()
  public id: number;

  public movieDetails: MovieDetails;

  public movieActors: MovieActors;

  constructor(
    private movieService: MoviesService
  ) { }

  ngOnInit() {
    this.movieService.getMovieDetails(this.id).subscribe((movieDetails: MovieDetails) => this.movieDetails = movieDetails);
    this.movieService.getMovieActors(this.id).subscribe((movieActors: MovieActors) => this.movieActors = movieActors);
  }

}
