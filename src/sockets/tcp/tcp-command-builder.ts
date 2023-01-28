import { SetParameterData } from '../types';
const setParamCmd = Buffer.from('setparam ', 'ascii');

export class TcpCommandBuilder {
  static buildSetParamCommand(data: SetParameterData[]) {
    const cmdParamsBuffer = Buffer.from(
      data.map(data => `${data.parameterId}:${data.value}`).join(';'),
      'ascii',
    );
    const resultBuffer = Buffer.allocUnsafe(
      8 + setParamCmd.length + cmdParamsBuffer.length,
    );
    resultBuffer.writeUInt8(12);
    resultBuffer.writeUInt8(1, 1);

    resultBuffer.writeUInt8(0x05, 2);
    resultBuffer.writeUInt32BE(cmdParamsBuffer.length + setParamCmd.length, 3);
    Buffer.concat([setParamCmd, cmdParamsBuffer]).copy(resultBuffer, 7);

    resultBuffer.writeUInt8(1, resultBuffer.length - 1);
    return resultBuffer;
  }
}
