import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDbResponse, PagesTracker, MovieDetails, MovieActors, GenreResponse, Genre } from '../interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public pageTracker: PagesTracker = {
    popular: {
      page: 1,
      totalPages: 1,
      onLastPage: false
    }
  };

  private genres: Genre[] = [];

  public genresChanged = new Subject<void>();

  private updatePagingStatus = (section: keyof PagesTracker) => (response: MovieDbResponse) => {

    this.pageTracker[section].totalPages = response.total_pages;

    if (response.page === response.total_pages) {
      this.pageTracker[section].onLastPage = true;
    } else {
      this.pageTracker[section].page = response.page + 1;
    }

  }

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

  getPopularMovies(): Observable<MovieDbResponse> {
    return this
            .executeQuery<MovieDbResponse>(`/discover/movie?sort_by=popularity.desc&page=${this.pageTracker.popular.page}`)
            .pipe(tap(this.updatePagingStatus('popular')));
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.executeQuery<MovieDetails>(`/movie/${id}?dummy=value`);
  }

  getMovieActors(id: number): Observable<MovieActors> {
    return this.executeQuery<MovieActors>(`/movie/${id}/credits?dummy=value`);
  }

  getSearchedMovies(searchText: string): Observable<MovieDbResponse> {
    return this.executeQuery<MovieDbResponse>(`/search/movie?query=${searchText}`);
  }

  getGenres(): Observable<GenreResponse> {
    return this
            .executeQuery<GenreResponse>(`/genre/movie/list?dummy=value`)
            .pipe(
              tap(
                (response: GenreResponse) => {
                  this.genres = response.genres;
                  this.genresChanged.next();
                }
              )
            );
  }

  fetchGenres(): Genre[] {
    return this.genres.slice();
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
