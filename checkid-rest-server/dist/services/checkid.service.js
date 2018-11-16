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
let CheckIdService = class CheckIdService {
    constructor() {
        this.awsParameters = {
            accessKeyId: 'AKIAIYYXXURPHPOTXQXQ',
            secretAccessKey: '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',
            region: 'eu-west-1',
            bucket: 'idcheck',
        };
        this.rekognition = new Rekognition(this.awsParameters);
    }
    detectFaces(images) {
        return __awaiter(this, void 0, void 0, function* () {
            if (images) {
                const idImageText = yield this.rekognition.detectLabels(images[0]);
                if (this.isIdCard(idImageText)) {
                    const selfieImageText = yield this.rekognition.detectLabels(images[1]);
                    if (selfieImageText.Labels.any(x => {
                        ['Face', 'Human'].indexOf(x.Name) > -1 && x.Confidence > 50 && ['People'].indexOf(x.Name) <= -1;
                    }) && selfieImageText.Labels.any(y => y.Name === 'Labels')) {
                        const response = yield this.rekognition.compareFaces(images[0], images[1]);
                        return response;
                    }
                }
            }
            else {
                throw new Error('First image not have human face or it is undefined');
            }
        });
    }
    isIdCard(awsObject) {
        return awsObject.Labels.any(x => ['Id Cards', 'Document', 'Passport'].indexOf(x.Name) > -1 && x.Confidence > 50) &&
            awsObject.Labels.any(y => y.Name === 'Face');
    }
};
CheckIdService = __decorate([
    common_1.Injectable()
], CheckIdService);
exports.CheckIdService = CheckIdService;
//# sourceMappingURL=checkid.service.js.map