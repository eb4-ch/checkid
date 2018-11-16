import { Injectable, Catch } from '@nestjs/common';
import * as Rekognition from 'node-rekognition';
import * as fs from 'fs';

@Injectable()
export class CheckIdService {
    private awsParameters = {
        accessKeyId: 'AKIAIBTYSF3A4QXVP7QA',
        secretAccessKey: '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',
        region: 'eu-west-1',
        bucket: 'checkid',
    };

    private rekognition = new Rekognition(this.awsParameters);

    async detectFaces(images: Array<Buffer>) {
        if (images && images.length === 2) {
            const idImage = await this.rekognition.detectFaces(images[0])
                .catch((error) => { throw error; });

            if (idImage.FaceDetails && idImage.FaceDetails.length === 1) {
                const selfieImage = await this.rekognition.detectFaces(images[1]);

                if (selfieImage.FaceDetails !== undefined && selfieImage.FaceDetails.length === 1) {
                    const response = await this.rekognition.compareFaces(images[0], images[1]);
                    return response;
                } else {
                    throw new Error('There are more faces than one on either pciture.');
                }
            } else {
                // console.log('Second image not have human face or it is undefined');
                // return res.status(400).send({});
                throw new Error('Id image not have human face or it is undefined');
            }
        } else {
            // console.log('First image not have human face or it is undefined');
            // return res.status(400).send({});
            throw new Error('First image not have human face or it is undefined');
        }
    }

    async detect() {
        let u = {};
        fs.readFile('./src/images/the-26-coolest-women-in-uk-tech.jpg', async (error, data) => {
            if (error) throw error;
            // const encodedPic = data.toString('base64');
            // const decodedImage = new Buffer(encodedPic, 'base64').toString('binary');
            try {
                u = await this.rekognition.detectFaces(data);
                // const s3Images = await this.rekognition.uploadToS3(data, 'test');
            } catch (e) {
                throw e;
            }
            return u;
        });
        return undefined;
    }
}
