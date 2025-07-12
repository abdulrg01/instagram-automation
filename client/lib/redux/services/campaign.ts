import { CampaignDataProps, CampaignProps } from "@/constant/types/automation";
import { authApi } from "./auth";

const campaignApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignProps[], void>({
      query: () => ({ url: "/campaigns", method: "GET" }),
    }),
    getCampaignById: builder.mutation<CampaignProps, string>({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
    }),
    createCampaign: builder.mutation<CampaignProps, Partial<CampaignDataProps>>({
      query: (body) => ({ url: "/campaigns", method: "POST", body }),
    }),
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
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignApi;
