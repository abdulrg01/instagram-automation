import { CampaignDataProps, CampaignProps } from "@/constant/types/automation";
import { authApi } from "./auth";

const campaignApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignProps[], void>({
      query: () => ({ url: "/campaigns", method: "GET" }),
    }),
    getCampaignPerformance: builder.query<
      {
        week: string;
        impressions: number;
        engagement: number;
        conversions: number;
      }[],
      string | undefined
    >({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}/performance`,
        method: "GET",
      }),
    }),
    getUserCampaignSummary: builder.query<
      {
        name: string;
        active: number;
        responses: number;
        rate: number;
      }[],
      void
    >({
      query: () => ({
        url: "/campaigns/summary/all",
        method: "GET",
      }),
    }),
    getAllCampaignPerformances: builder.query<CampaignProps[], void>({
      query: () => ({
        url: "/campaigns/performance/all",
        method: "GET",
      }),
    }),
    getCampaignById: builder.mutation<CampaignProps, string>({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
    }),
    createCampaign: builder.mutation<CampaignProps, Partial<CampaignDataProps>>(
      {
        query: (body) => ({ url: "/campaigns", method: "POST", body }),
      }
    ),
    updateCampaign: builder.mutation<
      CampaignProps,
      { id: string; body: Partial<CampaignProps> }
    >({
      query: ({ id, body }) => ({
        url: `/campaigns/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCampaign: builder.mutation<void, string>({
      query: (id) => ({ url: `/campaigns/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useGetCampaignByIdMutation,
  useGetCampaignPerformanceQuery,
  useGetUserCampaignSummaryQuery,
  useGetAllCampaignPerformancesQuery,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignApi;
