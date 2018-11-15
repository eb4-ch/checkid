import { Injectable } from "@angular/core";
import { Slides } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { HttpClient } from "@angular/common/http";
import { testb64 } from './test';
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

@Injectable()
export class SlideService {
    slides?: Slides;

    humanPicture?: File;
    idPicture?: File;

    private options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE
    }

    constructor(
        private camera: Camera,
        private http: HttpClient
    ) { }

    startCamera(isHumanPicture: boolean): any {
        this.camera.getPicture(this.options).then((imageData) => {
            if (isHumanPicture) {
                this.idPicture =
                    this.b64toFile(imageData, 'human.png', 'data:image/png');
                this.callEndpoint();
            } else {
                this.humanPicture =
                    this.b64toFile(imageData, 'id.png', 'data:image/png');
                    this.callEndpoint();
            }
            this.slides.slideNext();
        }, (err) => {
            // Handle error
        });
    }

    private callEndpoint() {
        this.http.post('http://192.168.1.86:3003/upload', this.filesToFormData()).subscribe(response => {
            const u = '';
        });
    }

    filesToFormData(): FormData {
        const result = new FormData();
        if (this.idPicture) {
            result.append('uploads[]', this.idPicture, this.idPicture.name);
        }
        if (this.humanPicture) {
            result.append('uploads[]', this.humanPicture, this.humanPicture.name);
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
}
