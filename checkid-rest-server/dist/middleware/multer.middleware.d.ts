import { NestMiddleware } from '@nestjs/common';
export declare class MulterMiddleware implements NestMiddleware {
    resolve(): (req: any, res: any, next: any) => void;
}
