import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public searchText = '';

  public ideas = [
    'Spiderman',
    'Avengers',
    'El señor de los anillos',
    'La vida es bella'
  ];

  constructor(
    private movieService: MoviesService
  ) {}

  searchMovies(e: CustomEvent): void {
    const searchText = e.detail.value;
    this.movieService.getSearchedMovies(searchText).subscribe(console.log);
  }

  selectIdea(idea: string): void {
    this.searchText = idea;
  }

}
