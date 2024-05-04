import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, ITokensPayload } from '@modules/auth/types/auth.type';
import { IUser } from '@modules/user';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {} as IUser,
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<ITokensPayload>) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
    clear: state => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setTokens, setUser, clear } = authSlice.actions;

export default authSlice.reducer;
