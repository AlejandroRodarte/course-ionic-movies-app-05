import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input()
  public id: number;

  constructor(
    private movieService: MoviesService
  ) { }

  ngOnInit() {
    this.movieService.getMovieDetails(this.id).subscribe(console.log);
    this.movieService.getMovieActors(this.id).subscribe(console.log);
  }

}
