import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides } from 'ionic-angular';

import { SlideService } from './services/slide.service';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-check-id',
  templateUrl: 'check-id.html'
})
export class CheckIdPage {
  @ViewChild(Slides) slides: Slides;

  constructor(private slideService: SlideService) {
  }

  ngOnInit() {
    this.slideService.slides = this.slides;
  }

}
