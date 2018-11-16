import { Component } from '@angular/core';
import { SlideService } from '../../services/slide.service';

@Component({
    selector: 'summary-slide',
    templateUrl: 'summary.slide.html'
})
export class SummarySlide {

    get isRecognitionPositive(): boolean {
        return this.slideService.recognitionResult;
    }

    constructor(private slideService: SlideService) { }

    image = 'assets/img/ica-slidebox-img-4.png';
    title = this.isRecognitionPositive ? 'The magic happend' : 'Danger!';
    description = this.isRecognitionPositive ?
        'The human which you flashed is the same person as on the ID card.' :
        'The human on the picture is <b>not</b> the same person as on the ID card!';
}
