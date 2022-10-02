import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppDefaultController {
  @Get()
  serveBase(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../..', 'public/index.html'));
  }
}
