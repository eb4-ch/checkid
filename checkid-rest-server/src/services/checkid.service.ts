import { Injectable, Catch } from '@nestjs/common';
import * as Rekognition from 'node-rekognition';
import * as fs from 'fs';

@Injectable()
export class CheckIdService {
    private awsParameters = {
        accessKeyId: '',
        secretAccessKey: '',
        region: 'eu-west-1',
        bucket: 'idcheck',
    };

    private rekognition = new Rekognition(this.awsParameters);

    async detectFaces(images: Array<Buffer>) {
        if (images) { // && images.length === 2
            const idImageText = await this.rekognition.detectLabels(images[0]);
            // const idImage = await this.rekognition.detectFaces(images[0]);
            if (this.isIdCard(idImageText)) {
                const selfieImageText = await this.rekognition.detectLabels(images[1]);
                if (selfieImageText.Labels.any(x => {
                    ['Face', 'Human'].indexOf(x.Name) > -1 && x.Confidence > 50 && ['People'].indexOf(x.Name) <= -1;
                }) && selfieImageText.Labels.any(y => y.Name === 'Labels')) {
                    const response = await this.rekognition.compareFaces(images[0], images[1]);
                    return response;
                }
            }

            // .catch((error) => { throw error; });

            // if (idImage.FaceDetails && idImage.FaceDetails.length === 1 && idImageText.TextDetections.length > 0) {
            // if (idImage.FaceRecords && idImage.FaceRecords.length === 1 /*&& idImageText.TextDetections.length > 0*/) {
            //     const selfieImageUpload = await this.rekognition.uploadToS3(images[0], 'checkID');
            //     const selfieImage = await this.rekognition.indexFaces(images[1]);

            //     if (selfieImage.FaceRecords !== undefined && selfieImage.FaceRecords.length === 1) {
            //         const response = await this.rekognition.compareFaces(images[0], images[1]);
            //         return response;
            //     } else {
            //         throw new Error('There are more faces than one on either pciture.');
            //     }
            // } else {
            //     // console.log('Second image not have human face or it is undefined');
            //     // return res.status(400).send({});
            //     throw new Error('Id image not have human face or it is undefined');
            // }
        } else {
            // console.log('First image not have human face or it is undefined');
            // return res.status(400).send({});
            throw new Error('First image not have human face or it is undefined');
        }
    }

    isIdCard(awsObject: any): boolean {
        return awsObject.Labels.any(x =>
            ['Id Cards', 'Document', 'Passport'].indexOf(x.Name) > -1 && x.Confidence > 50) &&
            awsObject.Labels.any(y => y.Name === 'Face');
    }
}
