import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie, MovieDbResponse } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public searchText = '';

  public loading = false;

  public movies: Movie[] = [];

  public ideas = [
    'Spiderman',
    'Avengers',
    'El señor de los anillos',
    'La vida es bella'
  ];

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController
  ) {}

  searchMovies(e: CustomEvent): void {

    const searchText = e.detail.value;

    if (searchText) {

      this.loading = true;

      this
        .movieService
        .getSearchedMovies(searchText)
        .pipe(
          tap(
            (response: MovieDbResponse) => {
              this.movies = response.results;
              this.loading = false;
            }
          )
        )
        .subscribe(console.log);

    } else {
      this.movies = [];
    }

  }

  selectIdea(idea: string): void {
    this.searchText = idea;
  }

  async showMovieDetails(id: number): Promise<void> {

    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: { id }
    });

    await modal.present();

  }

}
