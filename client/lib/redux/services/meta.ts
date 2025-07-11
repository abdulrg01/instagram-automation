import { instagramAccountsProps } from "@/constant/types/auth";
import { authApi } from "./auth";

const metaApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstagramAccounts: builder.query<instagramAccountsProps[], string | undefined>({
      query: (userId) => ({
        url: `/meta/${userId}`,
        method: "GET",
      }),
    }),
    tokenRefresh: builder.mutation<instagramAccountsProps, string | undefined>({
      query: (instagramAccountId) => ({
        url: `/meta/refresh-token/${instagramAccountId}`,
        method: "PUT",
      }),
    }),
    deleteInstagramAccount: builder.mutation({
      query: (id) => ({
        url: `/meta/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetInstagramAccountsQuery,
  useTokenRefreshMutation,
  useDeleteInstagramAccountMutation,
} = metaApi;
