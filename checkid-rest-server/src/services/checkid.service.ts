import { Injectable, Catch } from '@nestjs/common';
import * as Rekognition from 'node-rekognition';
import * as fs from 'fs';

@Injectable()
export class CheckIdService {
    private awsParameters = {
        accessKeyId: '',
        secretAccessKey: '',
        region: 'eu-west-1',
        bucket: 'checkid',
    };

    private rekognition = new Rekognition(this.awsParameters);

    async detectFaces(base64Image: string) {
        let d = {};
        try {
            d = await this.rekognition.detectFaces(Buffer.from(base64Image, 'base64'));
        } catch (e) {
            throw e;
        }
        return d;
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
