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

  saveMovie(movieDetails: MovieDetails): void {
    this.movieDetailsArr.push(movieDetails);
    this.storage.set('movies', this.movieDetailsArr);
  }

}
