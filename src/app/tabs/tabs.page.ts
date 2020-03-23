import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private dataLocalService: DataLocalService,
    private movieService: MoviesService
  ) {}

  async ngOnInit() {
    await this.dataLocalService.loadMovies();
    this.movieService.getGenres().subscribe();
  }

}
