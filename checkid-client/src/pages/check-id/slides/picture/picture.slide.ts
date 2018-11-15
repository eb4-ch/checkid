import { Component, Input } from '@angular/core';

@Component({
    selector: 'picture-slide',
    templateUrl: 'picture.slide.html'
})
export class PictureSlide {
    @Input() isIdPicture: boolean;
    image = 'assets/img/ica-slidebox-img-1.png';
    title = 'Waiting for the hardware...';
    description = 'Your device camera is being started. Please be patient.';
}
