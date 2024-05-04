import { RootState } from "@app/store/types";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/query/fetchBaseQuery";

export const buildBaseQuery = (
  prefix = "",
  params?: FetchBaseQueryArgs,
): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> => {
  return fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/${prefix}`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      if (state.auth.accessToken) {
        headers.set("Authorization", `Bearer ${state.auth.accessToken}`);
      }

      return headers;
    },
    ...params,
  });
};
