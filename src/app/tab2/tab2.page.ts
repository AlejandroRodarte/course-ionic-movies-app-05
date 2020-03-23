import { Component } from '@angular/core';

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

  constructor() {}

  searchMovies(e: CustomEvent): void {
    const searchText = e.detail.value;
  }

  selectIdea(idea: string): void {
    this.searchText = idea;
  }

}
