import { AutomationProps } from "@/constant/types/automation";
import { authApi } from "./auth";

const automationApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    createRule: builder.mutation<
      AutomationProps,
      {
        name: string;
        trigger: string;
        keywords: string[];
        responseType: "COMMENT" | "DM";
        desc: string;
        status: string;
        responseTemplate: string;
        instagramAccountId: string | undefined;
      }
    >({
      query: (credentials) => ({
        url: "/rules",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserRules: builder.query<AutomationProps[], string | undefined>({
      query: (userId) => ({
        url: `/rules/get-user-roles/${userId}`,
        method: "GET",
      }),
    }),
    getARule: builder.query<AutomationProps, string | undefined>({
      query: (ruleId) => ({
        url: `/rules/${ruleId}`,
        method: "GET",
      }),
    }),
    updateRule: builder.mutation<
      AutomationProps,
      {
        _id: string;
        name: string;
        trigger: string;
        keywords: string[];
        status: string;
        responseType: string;
        desc: string;
        responseTemplate: string;
      } | null
    >({
      query: (credentials) => ({
        url: `/rules/${credentials?._id}`,
        method: "PUT",
        body: { credentials },
      }),
    }),
    updateRuleStatus: builder.mutation<
      AutomationProps,
      {
        id: string;
        status: string;
      } | null
    >({
      query: (credentials) => ({
        url: "/rules/update-status",
        method: "PUT",
        body: { credentials },
      }),
    }),
    deleteRule: builder.mutation<AutomationProps, string | undefined>({
      query: (id) => ({
        url: `/rules/${id}`,
        method: "DELETE",
      }),
    }),
    saveListener: builder.mutation<
      AutomationProps,
      { id: string; prompt: string; commentReply: string }
    >({
      query: ({ id, prompt, commentReply }) => ({
        url: `/rules/${id}/add-listener`,
        method: "POST",
        body: { prompt, commentReply },
      }),
    }),
    addTrigger: builder.mutation<
      AutomationProps,
      { id: string; trigger: string[] | string }
    >({
      query: ({ id, trigger }) => ({
        url: `/rules/${id}/add-trigger`,
        method: "PATCH",
        body: { trigger },
      }),
    }),
    addKeyword: builder.mutation<AutomationProps, { id: string; word: string }>(
      {
        query: ({ id, word }) => ({
          url: `/rules/${id}/add-keyword`,
          method: "PATCH",
          body: { word },
        }),
      }
    ),
    getAutomationInfo: builder.query<AutomationProps, string>({
      query: (id) => ({
        url: `/rules/${id}/get-automation-info`,
        method: "GET",
      }),
    }),
    editAutomation: builder.mutation<
      AutomationProps,
      { active: boolean; name: string; id: string }
    >({
      query: ({ active, name, id }) => ({
        url: `/rules`,
        method: "PATCH",
        body: { active, name, id },
      }),
    }),
    automationPost: builder.mutation<
      AutomationProps,
      {
        postId: string;
        caption?: string;
        media: string;
        mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
        automationId: string;
      }
    >({
      query: ({ automationId, postId, caption, media, mediaType }) => ({
        url: `/rules/${automationId}/save-posts`,
        method: "POST",
        body: { postId, caption, media, mediaType },
      }),
    }),
  }),
});

export const {
  useCreateRuleMutation,
  useUpdateRuleMutation,
  useGetUserRulesQuery,
  useGetARuleQuery,
  useUpdateRuleStatusMutation,
  useDeleteRuleMutation,
  useGetAutomationInfoQuery,
  useEditAutomationMutation,
  useSaveListenerMutation,
  useAddTriggerMutation,
  useAddKeywordMutation,
  useAutomationPostMutation,
} = automationApi;
