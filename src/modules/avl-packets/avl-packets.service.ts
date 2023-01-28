import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, FilterQuery, Model } from 'mongoose';
import { AvlPacket } from '@app/modules/avl-packets/models/avl-packet.model';
import { CreateAvlDataDto } from '@app/modules/avl-packets/dtos/create-avl-data-collection.dto';
import { ConsolidatedQueryDto } from '@app/modules/avl-packets/dtos/consolidated-query.dto';

@Injectable()
export class AvlPacketsService {
  constructor(
    private readonly avlPacketDocumentMongooseSoftDeleteModel: AvlPacket,
  ) {}

  findOne(filterQuery: FilterQuery<AvlPacket>) {
    // const ioElementPacket =
    //   this.avlPacketDocumentMongooseSoftDeleteModel.findOne(filterQuery);
    // if (!ioElementPacket) {
    //   throw new NotFoundException(CarErrors.RECORD_NOT_FOUND);
    // }
    // return ioElementPacket;
  }
  async findAll(collectionDto: any) {
    // const collector = new DocumentCollector<AvlPacketDocument>(
    //   this.avlPacketDocumentMongooseSoftDeleteModel,
    // );
    // return collector.find(collectionDto);
  }
  async createAvlPacket(createAvlDataDto: CreateAvlDataDto) {
    // return this.avlPacketDocumentMongooseSoftDeleteModel.create(
    //   createAvlDataDto,
    // );
  }

  deleteOne(filterQuery: FilterQuery<AvlPacket>) {
    // return this.avlPacketDocumentMongooseSoftDeleteModel.softDelete(
    //   filterQuery,
    // );
  }

  aggregate = (...args) => {
    // return this.avlPacketDocumentMongooseSoftDeleteModel.aggregate(...args);
  };

  getConsolidatedReportObject(consolidatedQuery: ConsolidatedQueryDto) {
    // const { fromDate, toDate } = consolidatedQuery;
    // return this.avlPacketDocumentMongooseSoftDeleteModel.aggregate([
    //   {
    //     $match: {
    //       'avlDataCollection.avlData': {
    //         $elemMatch: {
    //           timestamp: {
    //             $gte: fromDate,
    //             $lte: toDate,
    //           },
    //         },
    //       },
    //       // 'device._id': new ObjectId('6141e4472708697112efd9b2'),
    //     },
    //   },
    //   {
    //     $project: {
    //       data: {
    //         $map: {
    //           input: '$avlDataCollection.avlData',
    //           as: 'singleAvlRecord',
    //           in: {
    //             priority: '$$singleAvlRecord.priority',
    //             gps: '$$singleAvlRecord.gps',
    //             timestamp: '$$singleAvlRecord.timestamp',
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$data',
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         $dateToString: {
    //           format: '%Y-%m-%d',
    //           date: '$data.timestamp',
    //         },
    //       },
    //       data: {
    //         $push: '$data',
    //       },
    //       on: {
    //         $sum: {
    //           $cond: [
    //             {
    //               $gt: ['$data.gps.speed', 0],
    //             },
    //             1,
    //             0,
    //           ],
    //         },
    //       },
    //       off: {
    //         $sum: {
    //           $cond: [
    //             {
    //               $gt: ['$data.gps.speed', 0],
    //             },
    //             0,
    //             1,
    //           ],
    //         },
    //       },
    //       count: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       stats: {
    //         avg: {
    //           $avg: '$data.gps.speed',
    //         },
    //         minSpeed: {
    //           $arrayElemAt: [
    //             '$data',
    //             {
    //               $indexOfArray: [
    //                 '$data.gps.speed',
    //                 {
    //                   $min: '$data.gps.speed',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         maxSpeed: {
    //           $arrayElemAt: [
    //             '$data',
    //             {
    //               $indexOfArray: [
    //                 '$data.gps.speed',
    //                 {
    //                   $max: '$data.gps.speed',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         minTimestamp: {
    //           $arrayElemAt: [
    //             '$data',
    //             {
    //               $indexOfArray: [
    //                 '$data.timestamp',
    //                 {
    //                   $min: '$data.timestamp',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         maxTimestamp: {
    //           $arrayElemAt: [
    //             '$data',
    //             {
    //               $indexOfArray: [
    //                 '$data.timestamp',
    //                 {
    //                   $max: '$data.timestamp',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $addFields: {
    //       duration: {
    //         $divide: [
    //           {
    //             $subtract: [
    //               '$stats.maxTimestamp.timestamp',
    //               '$stats.minTimestamp.timestamp',
    //             ],
    //           },
    //           1000 * 60,
    //         ],
    //       },
    //     },
    //   },
    // ]);
  }
}
