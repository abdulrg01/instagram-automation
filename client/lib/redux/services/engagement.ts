import {
  engagementLogProps,
  EngagementSummary,
  HomeStats,
  MonthlyEngagement,
  PerformanceDataPoint,
} from "@/constant/types/automation";
import { authApi } from "./auth";

const engagementLog = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getEngagement: builder.query<engagementLogProps[], void>({
      query: () => ({
        url: "/engagement-logs",
        method: "GET",
      }),
    }),
    getPerformanceSummary: builder.query<PerformanceDataPoint[], void>({
      query: () => ({
        url: "/engagement-logs/performance-summary",
        method: "GET",
      }),
    }),
    getEngagementSummaries: builder.query<EngagementSummary[], void>({
      query: () => ({
        url: "/engagement-logs/summaries",
        method: "GET",
      }),
    }),
    getMonthlyEngagement: builder.query<MonthlyEngagement[], void>({
      query: () => ({
        url: "/engagement-logs/monthly-engagement",
        method: "GET",
      }),
    }),
    getHomeStats: builder.query<HomeStats, void>({
      query: () => ({
        url: "/engagement-logs/home-stats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetEngagementQuery,
  useGetPerformanceSummaryQuery,
  useGetEngagementSummariesQuery,
  useGetMonthlyEngagementQuery,
  useGetHomeStatsQuery,
} = engagementLog;
