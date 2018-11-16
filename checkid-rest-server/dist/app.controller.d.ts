import { AppService } from './services/app.service';
import { CheckIdService } from './services/checkid.service';
export declare class AppController {
    private readonly appService;
    private readonly checkIdService;
    constructor(appService: AppService, checkIdService: CheckIdService);
    root(): string;
    upload(res: any, files: any): Promise<void>;
}
