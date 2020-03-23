import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetails, MovieActors, Cast } from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input()
  public id: number;

  public movieDetails: MovieDetails;

  public movieCast: Cast[] = [];

  public trim = false;

  public slidePosterOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  private trimThreshold = 150;

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController,
    private datalocalService: DataLocalService,
    private toastController: ToastController
  ) { }

  ngOnInit() {

    this
      .movieService
      .getMovieDetails(this.id)
      .pipe(
        tap(
          (movieDetails: MovieDetails) => this.trim = movieDetails.overview.length > this.trimThreshold
        )
      )
      .subscribe((movieDetails: MovieDetails) => this.movieDetails = movieDetails);

    this.movieService.getMovieActors(this.id).subscribe((movieActors: MovieActors) => this.movieCast = movieActors.cast);

  }

  back(): void {
    this.modalController.dismiss();
  }

  async favorite(): Promise<void> {
    const message = this.datalocalService.saveMovie(this.movieDetails);
    await this.presentToast(message);
  }

  private async presentToast(message: string): Promise<void> {

    const toast = await this.toastController.create({
      message,
      duration: 1500
    });

    await toast.present();

  }

}
