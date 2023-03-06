import { Injectable } from '@nestjs/common';
import { AvlPacket } from '@app/modules/avl-packets/models/avl-packet.model';
import { CreateAvlDataPayload } from '@app/modules/avl-packets/payloads/create-avl-data-collection.payload';
import { ConsolidatedQueryPayload } from '@app/modules/avl-packets/payloads/consolidated-query.payload';

@Injectable()
export class AvlPacketsService {
  constructor(
    // private readonly avlPacket: AvlPacket
  ) {}

  findOne(filterQuery: any) {}
  async findAll(collectionPayload: any) {}
  async createAvlPacket(createAvlDataPayload: CreateAvlDataPayload) {}

  deleteOne(filterQuery: any) {}

  getConsolidatedReportObject(consolidatedQuery: ConsolidatedQueryPayload) {}
}
