import { ReconnectionConfig } from '../types';
import * as net from 'net';
export type TCPCloseEventTuple = [
  'close',
  (socket: net.Socket, hadError: boolean) => void,
];
export type TCPDrainEventTuple = ['drain', (socket: net.Socket) => void];
export type TCPEndEventTuple = ['end', (socket: net.Socket) => void];
export type TCPLookupEventTuple = [
  'lookup',
  (
    socket: net.Socket,
    err: Error,
    address: string,
    family: string | number,
    host: string,
  ) => void,
];
export type TCPReadyEventTuple = ['ready', (socket: net.Socket) => void];
export type TCPTimeoutEventTuple = ['timeout', (socket: net.Socket) => void];
export type TCPErrorEventTuple = ['error', (socket: net.Socket, err: Error) => void];
export type TCPDataEventTuple = ['data', (socket: net.Socket, data: Buffer) => void];

export type TCPListeningEventTuple = ['listening', (socket: net.Socket) => void];
export type TCPConnectEventTuple = ['connect', (socket: net.Socket) => void];

export type TCPSocketEventListenerTuples =
  | TCPCloseEventTuple
  | TCPErrorEventTuple
  | TCPDataEventTuple
  | TCPListeningEventTuple
  | TCPConnectEventTuple
  | TCPReadyEventTuple
  | TCPTimeoutEventTuple
  | TCPDrainEventTuple
  | TCPEndEventTuple
  | TCPLookupEventTuple;

export type TCPConfig = {
  port: number;
  host: string;
  reconnectionConfig: ReconnectionConfig;
};
