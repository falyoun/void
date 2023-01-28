import { NotFoundException } from '@nestjs/common';

export const notFoundPipe =
  (args: any = {}) =>
  <T>(doc: T) => {
    if (!doc) throw new NotFoundException(args);
    return doc;
  };
