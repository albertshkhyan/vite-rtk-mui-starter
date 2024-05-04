import { IUser } from '@modules/user';

export interface ITokensPayload {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthPartial {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}
