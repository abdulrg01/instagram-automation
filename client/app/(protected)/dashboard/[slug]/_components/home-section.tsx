"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  MessageCircle,
  Send,
  BarChart3,
  Activity,
  Target,
  Plus,
} from "lucide-react";
import { User } from "@/constant/types/auth";
import {
  useGetEngagementSummariesQuery,
  useGetHomeStatsQuery,
  useGetMonthlyEngagementQuery,
} from "@/lib/redux/services/engagement";
import { formatDistanceToNow } from "date-fns";
import Loader from "@/components/global/loader";
import StatCard from "./StatCard";
import { CreateCampaignModal } from "./create-campaign-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetUserCampaignSummaryQuery } from "@/lib/redux/services/campaign";

interface UserProps {
  user: User | null;
}

export function HomeSection({ user }: UserProps) {
  const { data: campaignData = [] } = useGetUserCampaignSummaryQuery();
  const { data: engagementData = [] } = useGetMonthlyEngagementQuery();
  const { data: summaries = [], isLoading } = useGetEngagementSummariesQuery();

  const { data: homeStats, isLoading: isLoadingHomeStats } =
    useGetHomeStatsQuery();

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your Instagram automation
            today.
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          isLoadingHomeStats={isLoadingHomeStats}
          label="Auto Replies"
          value={
            homeStats?.autoReplies.count && homeStats?.autoReplies.count > 0
              ? homeStats?.autoReplies.count
              : 0
          }
          change={
            homeStats?.autoReplies?.change && homeStats.autoReplies.change > 0
              ? homeStats.autoReplies.change
              : 0
          }
          icon={<MessageCircle className="h-4 w-4 text-purple-600" />}
          color="text-purple-800"
          bgColor="from-purple-50 to-purple-100"
          titleColor="text-purple-700"
        />
        <StatCard
          isLoadingHomeStats={isLoadingHomeStats}
          label="DMs Sent"
          value={
            homeStats?.dmsSent.count && homeStats?.dmsSent.count > 0
              ? homeStats?.dmsSent.count
              : 0
          }
          change={
            homeStats?.dmsSent.change && homeStats?.dmsSent.change > 0
              ? homeStats?.dmsSent.change
              : 0
          }
          icon={<Send className="h-4 w-4 text-pink-600" />}
          color="text-pink-800"
          bgColor="from-pink-50 to-pink-100"
          titleColor="text-pink-700"
        />
        <StatCard
          isLoadingHomeStats={isLoadingHomeStats}
          label="Comments"
          value={
            homeStats?.comments.count && homeStats?.comments.count > 0
              ? homeStats?.comments.count
              : 0
          }
          change={
            homeStats?.comments.change && homeStats?.comments.change > 0
              ? homeStats?.comments.change
              : 0
          }
          icon={<Activity className="h-4 w-4 text-emerald-600" />}
          color="text-emerald-800"
          bgColor="from-emerald-50 to-emerald-100"
          titleColor="text-emerald-700"
        />
        <StatCard
          isLoadingHomeStats={isLoadingHomeStats}
          label="Active Campaigns"
          value={12}
          change={3}
          titleColor="text-orange-700"
          icon={<Target className="h-4 w-4 text-orange-600" />}
          color="text-orange-800"
          bgColor="from-orange-50 to-orange-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Engagement Trends
            </CardTitle>
            <CardDescription>
              Monthly automation performance overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                replies: {
                  label: "Auto Replies",
                  color: "hsl(var(--chart-1))",
                },
                dms: {
                  label: "DMs Sent",
                  color: "hsl(var(--chart-2))",
                },
                engagement: {
                  label: "Total Engagement",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData ? engagementData : undefined}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200"
                  />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="replies"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="dms"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Campaign Performance
            </CardTitle>
            <CardDescription>Response rates by campaign type</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ChartContainer
              config={{
                rate: {
                  label: "Response Rate %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  // data={campaignData ? campaignData : campaignDataB}
                  data={campaignDataB}
                  layout="horizontal"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200"
                  />
                  <XAxis type="number" domain={[0, 100]} className="text-xs" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    className="text-xs"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="rate"
                    fill="url(#gradient)"
                    radius={[0, 4, 4, 0]}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer> */}

            <ChartContainer
              config={{
                active: {
                  label: "active Campaigns",
                  color: "hsl(var(--chart-1))",
                },
                responses: {
                  label: "Total Responses",
                  color: "hsl(var(--chart-2))",
                },
                rate: {
                  label: "Campaign Rate",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={campaignData ? campaignData : undefined}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="responses"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest automation events and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summaries && summaries.length > 0 ? (
              summaries.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.responseSent ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <Badge
                    variant={activity.responseSent ? "default" : "destructive"}
                    className={
                      activity.responseSent
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }
                  >
                    {activity.responseSent ? "Success" : "Error"}
                  </Badge>
                </div>
              ))
            ) : (
              <Card className="border-0 shadow-lg flex items-center justify-center">
                <CardDescription>No recent activity found.</CardDescription>
                <CardContent className="space-y-3">
                  <Button
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => setShowCreateModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {isLoading ? (
                      <Loader state={isLoading}>Loading...</Loader>
                    ) : (
                      "Create Campaign"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        user={user}
      />
    </div>
  );
}
