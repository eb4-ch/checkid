"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Rekognition = require("node-rekognition");
const fs = require("fs");
let CheckIdService = class CheckIdService {
    constructor() {
        this.awsParameters = {
            accessKeyId: 'AKIAIBTYSF3A4QXVP7QA',
            secretAccessKey: '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',
            region: 'eu-west-1',
            bucket: 'checkid',
        };
        this.rekognition = new Rekognition(this.awsParameters);
    }
    detectFaces(images) {
        return __awaiter(this, void 0, void 0, function* () {
            if (images && images.length === 2) {
                const idImage = yield this.rekognition.detectFaces(images[0])
                    .catch((error) => { throw error; });
                if (idImage.FaceDetails && idImage.FaceDetails.length === 1) {
                    const selfieImage = yield this.rekognition.detectFaces(images[1]);
                    if (selfieImage.FaceDetails !== undefined && selfieImage.FaceDetails.length === 1) {
                        const response = yield this.rekognition.compareFaces(images[0], images[1]);
                        return response;
                    }
                    else {
                        throw new Error('There are more faces than one on either pciture.');
                    }
                }
                else {
                    throw new Error('Id image not have human face or it is undefined');
                }
            }
            else {
                throw new Error('First image not have human face or it is undefined');
            }
        });
    }
    detect() {
        return __awaiter(this, void 0, void 0, function* () {
            let u = {};
            fs.readFile('./src/images/the-26-coolest-women-in-uk-tech.jpg', (error, data) => __awaiter(this, void 0, void 0, function* () {
                if (error)
                    throw error;
                try {
                    u = yield this.rekognition.detectFaces(data);
                }
                catch (e) {
                    throw e;
                }
                return u;
            }));
            return undefined;
        });
    }
};
CheckIdService = __decorate([
    common_1.Injectable()
], CheckIdService);
exports.CheckIdService = CheckIdService;
//# sourceMappingURL=checkid.service.js.map