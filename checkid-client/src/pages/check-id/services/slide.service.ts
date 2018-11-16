import { Injectable } from "@angular/core";
import { Slides, Platform, LoadingController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SlideService {
    private loading = this.loadingController.create({
        content: 'Checking the correctness. Please wait...'
    });
    slides?: Slides;

    humanPicture?: File;
    idPicture?: File;
    recognitionResult?: any;

    private options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        cameraDirection: 0
    }

    get isApp(): boolean {
        return !this.platform.is('core') && !this.platform.is('mobileweb');
    }

    constructor(
        private camera: Camera,
        private http: HttpClient,
        private platform: Platform,
        private loadingController: LoadingController
    ) { }

    startCamera(isHumanPicture: boolean): void {
        if (this.isApp) {
            this.camera.getPicture(this.options).then((imageData) => {
                if (isHumanPicture) {
                    this.humanPicture =
                        this.b64toFile(imageData, 'human.png', 'data:image/png');
                    this.loading.present();
                    this.callEndpoint().subscribe((response: any) => {
                        this.slide();
                        this.recognitionResult = response.FaceMatches.length > 0;
                        this.loading.present();
                    });
                } else {
                    this.idPicture =
                        this.b64toFile(imageData, 'id.png', 'data:image/png');
                    this.slide();
                }
            }, (err) => {
                // Handle error
            });
        } else {
            this.slide();
        }
    }

    reset() {
        this.humanPicture = undefined;
        this.idPicture = undefined;
        this.recognitionResult = undefined;
        this.slide(0);
    }

    private callEndpoint(): Observable<Object> {
        // return this.http.post('http://localhost:3000/upload', this.filesToFormData());
        return this.http.post('http://192.168.1.86:3000/upload', this.filesToFormData());
    }

    filesToFormData(): FormData {
        const result = new FormData();
        if (this.idPicture) {
            result.append('files[]', this.idPicture, this.idPicture.name);
        }
        if (this.humanPicture) {
            result.append('files[]', this.humanPicture, this.humanPicture.name);
        }
        return result;
    }

    private b64toFile(b64Data, filename, contentType = '', sliceSize = 512): File {
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new File(byteArrays, filename, { type: contentType });
    }

    slide(index: number = undefined) {
        this.slides.lockSwipes(false);
        if (index || index === 0) {
            this.slides.slideTo(index);
        } else {
            this.slides.slideNext();
        } this.slides.lockSwipes(true);
    }
}
