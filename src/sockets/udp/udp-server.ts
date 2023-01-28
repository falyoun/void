import { Injectable } from '@nestjs/common';
import { ConnectionServer } from '../server';

@Injectable()
export class UdpConnectionServer extends ConnectionServer {}
