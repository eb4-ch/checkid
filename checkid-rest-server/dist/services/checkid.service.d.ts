/// <reference types="node" />
export declare class CheckIdService {
    private awsParameters;
    private rekognition;
    detectFaces(images: Array<Buffer>): Promise<any>;
    isIdCard(awsObject: any): boolean;
}
