import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private movieDetailsArr: MovieDetails[] = [];

  constructor(
    private storage: Storage
  ) { }

  saveMovie(movieDetails: MovieDetails): string {

    const index = this.movieDetailsArr.findIndex((details: MovieDetails) => details.id === movieDetails.id);
    let message: string;

    if (index === -1) {
      this.movieDetailsArr.push(movieDetails);
      message = 'Movie added to favorites';
    } else {
      this.movieDetailsArr.splice(index, 1);
      message = 'Movie deleted from favorites';
    }

    this.storage.set('movies', this.movieDetailsArr);

    return message;

  }

}
