import { Middleware, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Middleware()
export class MulterMiddleware implements NestMiddleware {
  resolve(): (req, res, next) => void {
    const upload = multer({ dest: './uploads' });
    return upload.any();
  }
}