export enum ClientEvents {
  JOIN = 'join',
  CREATE = 'create',
  UPDATE_USER = 'updateUser',
  ROLL = 'roll',
}

export enum ServerEvents {
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  USERS = 'sendUsers',
  RESULT = 'drawResult',
  CREATED = 'created',
  ROOM_NOT_FOUND = 'roomNotFound',
  ROOM_JOINED = 'roomJoined',
}

export interface IRoomResponse {
  roomCode: string;
}