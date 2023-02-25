import { Injectable } from '@nestjs/common';
import { LivePreviewPayload } from './payloads/live-preview.payload';

@Injectable()
export class LivePreviewService {
  public async broadcastData(data: LivePreviewPayload) {
    // handle live preview data
  }
}
