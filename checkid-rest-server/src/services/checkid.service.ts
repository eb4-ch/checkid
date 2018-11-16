import { Injectable, Catch, HttpStatus } from '@nestjs/common';
import * as Rekognition from 'node-rekognition';
import * as fs from 'fs';

@Injectable()
export class CheckIdService {
    private awsParameters = {
        accessKeyId: 'AKIAIZ37ZRDONPZ3OPRA',
        secretAccessKey: '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',
        region: 'eu-west-1',
        bucket: 'checkid',
    };

    private rekognition = new Rekognition(this.awsParameters);

    async detectFaces(images: Array<Buffer>, response: any) {
        if (images && images.length === 2) {
            const idImage = await this.rekognition.detectFaces(images[0])
                .catch((error) => { throw error; });

            if (idImage.FaceDetails && idImage.FaceDetails.length === 1) {
                const selfieImage = await this.rekognition.detectFaces(images[1]);

                if (selfieImage.FaceDetails !== undefined && selfieImage.FaceDetails.length === 1) {
                    const result = await this.rekognition.compareFaces(images[0], images[1]);
                    response.status(HttpStatus.OK).json({
                        matched: result.FaceMatches.length > 0,
                        confidence: result.SourceImageFace.Confidence,
                    });
                } else {
                    response.status(HttpStatus.FORBIDDEN)
                        .send('There are more faces than one on either picture.');
                }
            } else {
                response.status(HttpStatus.CONFLICT)
                    .send('Id image not have human face or it is undefined');
            }
        } else {
                response.status(HttpStatus.CONFLICT)
                .send('First image not have human face or it is undefined');
        }
    }
}
