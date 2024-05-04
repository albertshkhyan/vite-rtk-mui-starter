import { useSelector, useDispatch } from "react-redux";
import { ITokensPayload } from "../types/auth.type";
import { IUser } from "@modules/user";
import { RootState } from "@app/store";
import { clear, setTokens, setUser } from "@modules/auth";

interface UseAuth {
  isAuthenticated: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
  login: (user: IUser, tokens: ITokensPayload) => void;
  logout: () => void;
}

export const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user = {} as IUser,
    accessToken,
    refreshToken,
  } = useSelector((state: RootState) => state.auth);

  const login = (user: IUser, tokens: ITokensPayload) => {
    dispatch(setUser(user));
    dispatch(setTokens(tokens));
  };

  const logout = () => {
    dispatch(clear());
  };

  return {
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
    login,
    logout,
  };
};
