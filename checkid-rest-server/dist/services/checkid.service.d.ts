export declare class CheckIdService {
    private awsParameters;
    private rekognition;
    detectFaces(base64Image: string): Promise<{}>;
    detect(): Promise<any>;
}
