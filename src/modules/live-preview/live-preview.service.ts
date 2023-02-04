import { Injectable } from '@nestjs/common';
import { LivePreviewDto } from './dto/live-preview.dto';

@Injectable()
export class LivePreviewService {
  public async broadcastData(data: LivePreviewDto) {
    // handle live preview data
  }
}
