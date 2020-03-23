import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input()
  public movies: Movie[] = [];

  public slideOpts = {
    slidesPerView: 1.1,
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
