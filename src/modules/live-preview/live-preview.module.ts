import { Module } from '@nestjs/common';
import { LivePreviewService } from './live-preview.service';

@Module({
  providers: [LivePreviewService],
})
export class LivePreviewModule {}
