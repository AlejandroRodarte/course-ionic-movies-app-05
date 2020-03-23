import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetails } from '../interfaces/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private movieDetailsArr: MovieDetails[] = [];

  public moviesChanged = new Subject<void>();

  constructor(
    private storage: Storage
  ) { }

  getMovies(): MovieDetails[] {
    return this.movieDetailsArr.slice();
  }

  async saveMovie(movieDetails: MovieDetails): Promise<string> {

    const index = this.movieDetailsArr.findIndex((details: MovieDetails) => details.id === movieDetails.id);
    let message: string;

    if (index === -1) {
      this.movieDetailsArr.push(movieDetails);
      message = 'Movie added to favorites';
    } else {
      this.movieDetailsArr.splice(index, 1);
      message = 'Movie deleted from favorites';
    }

    await this.storage.set('movies', this.movieDetailsArr);
    this.moviesChanged.next();

    return message;

  }

  async loadMovies(): Promise<void> {

    const movieDetailsArr = await this.storage.get('movies') || [];
    this.movieDetailsArr = movieDetailsArr;

    this.moviesChanged.next();

  }

  movieExists(id: number): boolean {
    return this.movieDetailsArr.findIndex((movie: MovieDetails) => movie.id === id) !== -1;
  }

}
