import { Component, Input } from '@angular/core';
import { SlideService } from '../../services/slide.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operator/map';

@Component({
    selector: 'welcome-slide',
    templateUrl: 'welcome.slide.html'
})
export class WelcomeSlide {
    image = '';
    title = '';
    description = '';
    button = '';
    @Input() isHuman: boolean;

    constructor(
        private slideService: SlideService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        if (this.isHuman) {
            this.image = 'assets/img/ica-slidebox-img-3.png';
            this.title = 'Got the ID card';
            this.description = 'Nice! We got the ID card, now let\'s flash the human.';
            this.button = 'Scan the human';
        } else {
            this.image = 'assets/img/ica-slidebox-img-2.png';
            this.title = 'Verify the owner of an ID card';
            this.description = 'We are ready to verify the owner of any ID card. Click below to <b>first</b> scan the <b>ID card!</b>';
            this.button = 'Scan the ID';
        }
    }

    slideNext() {
        this.slideService.slides.slideNext();
        setTimeout(() => this.slideService.startCamera(this.isHuman), 600);
    }
}
