import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input()
  public movies: Movie[] = [];

  public slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async showMovieDetails(id: number): Promise<void> {

    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: { id }
    });

    await modal.present();

  }

}
