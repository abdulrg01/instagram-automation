import { AppProps } from "@/constant/types/app";
import { authApi } from "./auth";

const appApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getApp: builder.query<AppProps[], void>({
      query: () => ({ url: "/app", method: "GET" }),
    }),
    getAppById: builder.mutation<AppProps, string>({
      query: (id) => ({
        url: `/app/${id}`,
        method: "GET",
      }),
    }),
    createApp: builder.mutation<AppProps, Partial<AppProps>>({
      query: (body) => ({ url: "/app", method: "POST", body }),
    }),
    updateApp: builder.mutation<
      AppProps,
      { id: string; body: Partial<AppProps> }
    >({
      query: ({ id, body }) => ({
        url: `/app/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteApp: builder.mutation<void, string>({
      query: (id) => ({ url: `/app/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useCreateAppMutation,
  useGetAppByIdMutation,
  useGetAppQuery,
  useUpdateAppMutation,
  useDeleteAppMutation,
} = appApi;
