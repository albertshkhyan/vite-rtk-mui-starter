import { Mutex } from "async-mutex";
import { buildBaseQuery } from "./baseQuery";
import { AuthStorageKeys } from "@config/constants";
import { setTokens, clear } from "@modules/auth";

const mutex = new Mutex();

interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

export const baseQueryWithReAuth = (prefix = "") => {
  console.log(" Work build basequery", { prefix });
  return async (args: any, api: any, extraOptions: any) => {
    const baseQuery = buildBaseQuery(prefix);

    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    try {
      let response = await baseQuery(args, api, extraOptions);

      if (response.error && response.error.status === 401) {
        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();

          try {
            const refreshToken = localStorage.getItem(
              AuthStorageKeys.REFRESH_TOKEN,
            );
            const authQuery = buildBaseQuery("auth");

            const refreshResult = (await authQuery(
              {
                url: "refresh-token",
                method: "POST",
                body: { refreshToken },
              },
              api,
              extraOptions,
            )) as { data: RefreshResult };

            if (refreshResult.data) {
              // Dispatch the action to update the access token in the Redux store
              api.dispatch(
                setTokens({
                  accessToken: refreshResult.data.accessToken,
                  refreshToken: refreshResult.data.refreshToken,
                }),
              );

              // Retry the original request with the updated access token
              response = await baseQuery(args, api, extraOptions);
            } else {
              // If token refresh fails, logout the user
              api.dispatch(clear());
              // You may also want to redirect the user to the login page here
            }
          } finally {
            // Release the mutex lock once the token refresh is complete
            release();
          }
        } else {
          // Wait until the mutex is available without locking it
          await mutex.waitForUnlock();
          // Retry the original request after acquiring the mutex lock
          response = await baseQuery(args, api, extraOptions);
        }
      }

      return response;
    } catch (error) {
      // Handle any other errors that may occur during the request
      console.error("Error during request:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
};
