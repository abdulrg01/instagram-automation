"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import {
  Plus,
  Target,
  BarChart3,
  MessageCircle,
  MoreHorizontal,
  Edit,
  Copy,
  Play,
  Pause,
  TrendingUp,
  ArrowLeft,
  Filter,
  Search,
  Folder,
  Bot,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import { CreateCampaignModal } from "./create-campaign-modal";
import { User } from "@/constant/types/auth";
import {
  useGetCampaignPerformanceQuery,
  useGetCampaignsQuery,
} from "@/lib/redux/services/campaign";
import { CampaignProps } from "@/constant/types/automation";

interface Props {
  user: User | null;
}

export function CampaignManagement({ user }: Props) {
  const { data: campaigns } = useGetCampaignsQuery();
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");
  const [selectedCampaign, setSelectedCampaign] =
    useState<Partial<CampaignProps> | null>(null);
  const { data: campaignPerformanceData = [] } = useGetCampaignPerformanceQuery(
    selectedCampaign?._id
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleViewCampaign = (campaign: Partial<CampaignProps>) => {
    setSelectedCampaign(campaign);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedCampaign(null);
  };

  const filteredCampaigns = campaigns?.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || campaign.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // List View
  if (currentView === "list") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Campaign Management
            </h1>
            <p className="text-gray-600 mt-1">
              Organize and track your Instagram marketing campaigns
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    Active Campaigns
                  </p>
                  <p className="text-2xl font-bold text-purple-800">
                    {campaigns
                      ? campaigns.filter((c) => c.status === "active").length
                      : "0"}
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Total Automations
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    {campaigns
                      ? campaigns.reduce(
                          (sum, c) => sum + c.assignedRules.length,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <Bot className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Total Posts
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {campaigns
                      ? campaigns.reduce(
                          (sum, c) => sum + c.postsData.length,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Avg ROI</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {campaigns
                      ? Math.round(
                          campaigns?.reduce(
                            (sum, c) => sum + c.performance.roi,
                            0
                          ) / campaigns?.length
                        )
                      : "0"}
                    %
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Product Launch">
                      Product Launch
                    </SelectItem>
                    <SelectItem value="Customer Service">
                      Customer Service
                    </SelectItem>
                    <SelectItem value="Sales Event">Sales Event</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid */}
        <div>
          {filteredCampaigns && filteredCampaigns?.length > 0 ? (
            filteredCampaigns?.map((campaign) => (
              <div
                key={campaign._id}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <Card
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewCampaign(campaign)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {campaign.name}
                        </CardTitle>
                        <Badge
                          className={
                            campaign.status === "active"
                              ? "bg-green-100 text-green-700"
                              : campaign.status === "paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {campaign.status === "active" && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {campaign.status === "paused" && (
                            <Pause className="w-3 h-3 mr-1" />
                          )}
                          {campaign.status === "draft" && (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {campaign.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {campaign.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Campaign Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-800">
                          {campaign.assignedRules.length}
                        </div>
                        <div className="text-xs text-purple-600">
                          Automations
                        </div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-800">
                          {campaign.postsData.length}
                        </div>
                        <div className="text-xs text-blue-600">Posts</div>
                      </div>
                    </div>

                    {/* Campaign Category */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <Badge variant="outline" className="text-xs">
                        <Folder className="w-3 h-3 mr-1" />
                        {campaign.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center">
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Campaigns Found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ||
                  filterStatus !== "all" ||
                  filterCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first campaign to get started"}
                </p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </div>
          )}
        </div>

        <CreateCampaignModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          user={user}
        />
      </div>
    );
  }

  // Detail View
  if (currentView === "detail" && selectedCampaign) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBackToList}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {selectedCampaign.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {selectedCampaign.description}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Campaign
            </Button>
            <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button
              className={
                selectedCampaign.status === "active"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {selectedCampaign.status === "active" ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Campaign
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Campaign
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Campaign Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">
                  {selectedCampaign?.performance?.impressions.toLocaleString()}
                </div>
                <p className="text-sm text-purple-600 mt-1">
                  Total Impressions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800">
                  {selectedCampaign?.performance?.engagement.toLocaleString()}
                </div>
                <p className="text-sm text-green-600 mt-1">Total Engagement</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-800">
                  {selectedCampaign?.performance?.conversions}
                </div>
                <p className="text-sm text-blue-600 mt-1">Conversions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-800">
                  {selectedCampaign?.performance?.roi}%
                </div>
                <p className="text-sm text-orange-600 mt-1">ROI</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Campaign Performance
            </CardTitle>
            <CardDescription>
              Weekly performance metrics for this campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                impressions: {
                  label: "Impressions",
                  color: "hsl(var(--chart-1))",
                },
                engagement: {
                  label: "Engagement",
                  color: "hsl(var(--chart-2))",
                },
                conversions: {
                  label: "Conversions",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={
                    campaignPerformanceData
                      ? campaignPerformanceData
                      : undefined
                  }
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200"
                  />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Campaign Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Automations */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                Assigned Automations ({selectedCampaign?.assignedRules?.length})
              </CardTitle>
              <CardDescription>
                Automation rules assigned to this campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedCampaign?.assignedRules?.map((automation) => (
                <div
                  key={automation._id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        automation.status === "active"
                          ? "bg-gradient-to-r from-purple-100 to-pink-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Zap
                        className={`w-4 h-4 ${
                          automation.status === "active"
                            ? "text-purple-600"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{automation.name}</p>
                      <p className="text-xs text-gray-500">
                        {automation.responseType}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      automation.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {automation.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Assign Automation
              </Button>
            </CardContent>
          </Card>

          {/* Posts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                Campaign Posts ({selectedCampaign?.postsData?.length})
              </CardTitle>
              <CardDescription>
                Content and posts for this campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedCampaign?.postsData?.map((post) => (
                <div
                  key={post._id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{post.engagement}</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
