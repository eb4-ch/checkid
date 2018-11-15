import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckIdPage } from './check-id';
import { TranslateModule } from '@ngx-translate/core';
import { PictureSlide } from './slides/picture/picture.slide';
import { SummarySlide } from './slides/summary/summary.slide';
import { WelcomeSlide } from './slides/welcome/welcome.slide';
import { SlideService } from './services/slide.service';

@NgModule({
  declarations: [
    CheckIdPage,
    PictureSlide,
    SummarySlide,
    WelcomeSlide
  ],
  imports: [
    IonicPageModule.forChild(CheckIdPage),
    TranslateModule.forChild()
  ],
  providers: [SlideService],
  exports: [
    CheckIdPage
  ]
})
export class CheckIdPageModule { }
