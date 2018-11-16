import { Component, Input } from '@angular/core';
import { SlideService } from '../../services/slide.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
        this.slideService.slide();
        setTimeout(() => this.slideService.startCamera(this.isHuman), 600);
    }

    upload(inputElement: HTMLInputElement) {
        if (inputElement && inputElement.files) {
            // const b64 = this.getBase64(inputElement.files.item(0));
            // this.getBase64(inputElement.files.item(0)).subscribe(b64 => {
                const u = new FormData();
                for(let i = 0; i < inputElement.files.length; i++) {
                    const file = inputElement.files.item(i);
                    u.append('files[]', file, file.name)
                }
                this.http.post('http://localhost:3000/upload', u).subscribe(x => {
                    const u = '';
                });
            // });
            // const buffer = this.base64ToArrayBuffer(b64)
            // const files =
            // this.callEndpoint(this.filesToFormData([inputElement.files.item(0)])).subscribe(x => {
            //     const u = '';
            // });
        }
        // this.loadingIndicator.showWhile(
        //         this.http.request(this.generateUploadRequest(
        //             this.apiUrlProvider.getApiUrl(`/api/DozAnlassBewertung(${this.getAnlassId()})/Service.UploadBewertung`), file)).pipe(last()))
        //         .subscribe(() => {
        //             const translations =
        //                 this.translateService.instant(['teacher.grade.successfully-uploaded-title', 'teacher.grade.successfully-uploaded']);
        //             if (translations) {
        //                 this.notifications.success(translations['teacher.grade.successfully-uploaded-title'],
        //                     translations['teacher.grade.successfully-uploaded']);
        //             }
        //         });
        // }
        // this.resetFileInputElement(inputElement);
    }

    private base64ToArrayBuffer(base64): ArrayBuffer {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    private getBase64(file): Observable<string> {
        const source = new Subject<string>();
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            source.next(reader.result + '');
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        return source.asObservable();
    }

    private callEndpoint(formData: FormData): Observable<Object> {
        return this.http.post('http://localhost:3003/upload', formData);
    }

    filesToFormData(files: Array<File>): FormData {
        const result = new FormData();
        files.forEach(file => result.append('uploads[]', file, file.name));
        return result;
    }
}
