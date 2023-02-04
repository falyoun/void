import {
  AvlDataCollection,
  Codec16,
  Codec8,
  Codec8ex,
  CogmBaseClass,
  convertBytesToInt,
  DdsBaseClass,
  calculateCRC,
} from 'codecs-sdk';
import { BinaryReader } from 'buffer-sdk';

export class TcpPacketParser {
  private rawData: Buffer;
  constructor(data: Buffer) {
    this.rawData = data;
  }

  public decodeImei(): string {
    const data = this.rawData;
    if (data.length < 2) throw new InvalidPacketException('Packet too small');
    const imeiLength = data.readUInt16BE();
    if (data.length != 2 + imeiLength)
      throw new InvalidPacketException('Packet Incorrect Size');
    const imei = data.toString('utf8', 2);
    return imei;
  }
  public decodePacket(
    avlCallback: (
      decoededAvl: AvlDataCollection,
      data: Buffer,
    ) => Promise<void>,
  ) {
    const reader = new BinaryReader(this.rawData);
    // Header
    const preamble = reader.readInt32();
    const length = reader.readInt32();
    const codecId = convertBytesToInt(reader.readBytes(1));
    if (preamble != 0) throw new InvalidPacketException('Invalid Preamble');

    // Skip body
    reader.readBytes(length - 1);

    // Footer
    const crc = this.rawData.readUInt32BE(this.rawData.length - 4);
    const crcBuffer = this.rawData.subarray(8, this.rawData.length - 4);
    if (calculateCRC(crcBuffer) != crc)
      throw new InvalidPacketException('CRC Mismatch');

    const bodyReader = new BinaryReader(this.rawData);
    bodyReader.readBytes(9);
    const codec = this.getRequiredCodec(codecId, bodyReader);
    if (codec instanceof DdsBaseClass) {
      const body = codec.decode();
      avlCallback(body, this.rawData);
    } else if (codec instanceof CogmBaseClass) {
      //TODO handle command response
    }
  }

  public encodeCommand(): Buffer {
    const data = this.rawData;
    const packet = Buffer.allocUnsafe(4 + 4 + 4 + data.length);
    // 4 preamble
    packet.writeUInt32BE(0);
    // 4 data size
    packet.writeUInt32BE(data.length, 4);
    // RESULT
    data.copy(packet, 8);
    // 4 crc-16
    packet.writeUInt32BE(calculateCRC(data), packet.length - 4);
    return packet;
  }

  private getRequiredCodec(
    codecId,
    reader: BinaryReader,
  ): DdsBaseClass | CogmBaseClass {
    switch (codecId) {
      case 0x08:
        return new Codec8(reader);
      case 0x8e:
        return new Codec8ex(reader);
      case 0x10:
        return new Codec16(reader);
      default:
        return null;
    }
  }
}

export class InvalidPacketException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
