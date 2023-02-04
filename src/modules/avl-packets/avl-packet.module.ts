import { Module } from '@nestjs/common';
import { AvlPacketsService } from './avl-packets.service';

@Module({
  imports: [],
  providers: [AvlPacketsService],
  exports: [AvlPacketsService],
})
export class AvlPacketModule {}
