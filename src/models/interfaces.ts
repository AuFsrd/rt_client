

export interface ISafeUser {
  username: string,
  avatar: string,
}

export interface IUser extends ISafeUser {
  id: string,
}

export interface IRoll {
  result: number,
  user: IUser,
}