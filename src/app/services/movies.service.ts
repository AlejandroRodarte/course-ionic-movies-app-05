import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDbResponse } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getFeaturedMovies(): Observable<MovieDbResponse> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<MovieDbResponse>('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2020-02-20&primary_release_date.lte=2020-03-20&api_key=8a0d5e902649378bfb45e9ea87364a8a&language=es&include_image_language=es');
  }

}
