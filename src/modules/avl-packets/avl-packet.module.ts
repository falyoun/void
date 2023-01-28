import { Module } from '@nestjs/common';
import { AvlPacketsService } from './avl-packets.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  providers: [AvlPacketsService],
  exports: [AvlPacketsService],
})
export class AvlPacketModule {}
