import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDbResponse } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getFeaturedMovies(): Observable<MovieDbResponse> {

    const now = new Date();

    now.setDate(now.getDate() + 15);
    const before = this.formatDate(now);

    now.setDate(now.getDate() - 30);
    const after = this.formatDate(now);

    return this.executeQuery<MovieDbResponse>(`/discover/movie?primary_release_date.gte=${after}&primary_release_date.lte=${before}`);

  }

  private executeQuery<T>(query: string): Observable<T> {
    return this.http.get<T>(`${environment.url}${query}&api_key=${environment.apiKey}&language=es&include_image_language=es`);
  }

  private formatDate(date: Date): string {

    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;

  }

}
