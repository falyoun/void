import { Injectable } from '@nestjs/common';
import { AvlPacket } from '@app/modules/avl-packets/models/avl-packet.model';
import { CreateAvlDataDto } from '@app/modules/avl-packets/dtos/create-avl-data-collection.dto';
import { ConsolidatedQueryDto } from '@app/modules/avl-packets/dtos/consolidated-query.dto';

@Injectable()
export class AvlPacketsService {
  constructor(
    // private readonly avlPacket: AvlPacket
  ) {}

  findOne(filterQuery: any) {}
  async findAll(collectionDto: any) {}
  async createAvlPacket(createAvlDataDto: CreateAvlDataDto) {}

  deleteOne(filterQuery: any) {}

  getConsolidatedReportObject(consolidatedQuery: ConsolidatedQueryDto) {}
}
