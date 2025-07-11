"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, LineChart } from "recharts"
import {
  Plus,
  Target,
  BarChart3,
  MessageCircle,
  Calendar,
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
} from "lucide-react"
import { CreateCampaignModal } from "./create-campaign-modal"

// Mock data for campaigns
const campaigns = [
  {
    id: "camp_1",
    name: "Summer Collection Launch",
    description: "Promote new summer fashion collection with automated responses and DM campaigns",
    status: "active",
    category: "Product Launch",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 5000,
    spent: 3200,
    automationCount: 8,
    postsCount: 24,
    performance: {
      impressions: 125000,
      engagement: 8500,
      clicks: 2400,
      conversions: 180,
      roi: 320,
    },
    automations: [
      { id: "auto_1", name: "Product Inquiry Bot", type: "Comment Reply", status: "active" },
      { id: "auto_2", name: "Welcome New Followers", type: "DM Automation", status: "active" },
      { id: "auto_3", name: "Size Guide Helper", type: "Comment Reply", status: "active" },
    ],
    posts: [
      { id: "post_1", title: "Summer Dress Collection", type: "Feed Post", engagement: 1200 },
      { id: "post_2", title: "Beach Accessories", type: "Story", engagement: 800 },
      { id: "post_3", title: "Style Guide Video", type: "Reel", engagement: 2400 },
    ],
  },
  {
    id: "camp_2",
    name: "Customer Support Enhancement",
    description: "Improve customer service with automated support responses and FAQ handling",
    status: "active",
    category: "Customer Service",
    startDate: "2024-05-15",
    endDate: "2024-12-31",
    budget: 2000,
    spent: 800,
    automationCount: 5,
    postsCount: 12,
    performance: {
      impressions: 85000,
      engagement: 6200,
      clicks: 1800,
      conversions: 95,
      roi: 180,
    },
    automations: [
      { id: "auto_4", name: "FAQ Responder", type: "Comment Reply", status: "active" },
      { id: "auto_5", name: "Support Ticket Creator", type: "DM Automation", status: "active" },
    ],
    posts: [
      { id: "post_4", title: "How to Contact Us", type: "Feed Post", engagement: 600 },
      { id: "post_5", title: "FAQ Highlights", type: "Story", engagement: 400 },
    ],
  },
  {
    id: "camp_3",
    name: "Black Friday Sale",
    description: "Maximize Black Friday sales with targeted automation and promotional content",
    status: "paused",
    category: "Sales Event",
    startDate: "2024-11-20",
    endDate: "2024-11-30",
    budget: 8000,
    spent: 0,
    automationCount: 12,
    postsCount: 36,
    performance: {
      impressions: 0,
      engagement: 0,
      clicks: 0,
      conversions: 0,
      roi: 0,
    },
    automations: [
      { id: "auto_6", name: "Sale Announcer", type: "Comment Reply", status: "draft" },
      { id: "auto_7", name: "Discount Code Sender", type: "DM Automation", status: "draft" },
    ],
    posts: [
      { id: "post_6", title: "Black Friday Preview", type: "Feed Post", engagement: 0 },
      { id: "post_7", title: "Sale Countdown", type: "Story", engagement: 0 },
    ],
  },
]

// Performance data for charts
const campaignPerformanceData = [
  { week: "Week 1", impressions: 15000, engagement: 1200, conversions: 45 },
  { week: "Week 2", impressions: 18000, engagement: 1450, conversions: 52 },
  { week: "Week 3", impressions: 22000, engagement: 1800, conversions: 68 },
  { week: "Week 4", impressions: 25000, engagement: 2100, conversions: 75 },
]

export function CampaignManagement() {
  const [currentView, setCurrentView] = useState<"list" | "detail">("list")
  const [selectedCampaign, setSelectedCampaign] = useState<(typeof campaigns)[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const handleViewCampaign = (campaign: (typeof campaigns)[0]) => {
    setSelectedCampaign(campaign)
    setCurrentView("detail")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedCampaign(null)
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || campaign.status === filterStatus
    const matchesCategory = filterCategory === "all" || campaign.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

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
            <p className="text-gray-600 mt-1">Organize and track your Instagram marketing campaigns</p>
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
                  <p className="text-sm font-medium text-purple-700">Active Campaigns</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {campaigns.filter((c) => c.status === "active").length}
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
                  <p className="text-sm font-medium text-green-700">Total Automations</p>
                  <p className="text-2xl font-bold text-green-800">
                    {campaigns.reduce((sum, c) => sum + c.automationCount, 0)}
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
                  <p className="text-sm font-medium text-blue-700">Total Posts</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {campaigns.reduce((sum, c) => sum + c.postsCount, 0)}
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
                    {Math.round(campaigns.reduce((sum, c) => sum + c.performance.roi, 0) / campaigns.length)}%
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
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Product Launch">Product Launch</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleViewCampaign(campaign)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{campaign.name}</CardTitle>
                    <Badge
                      className={
                        campaign.status === "active"
                          ? "bg-green-100 text-green-700"
                          : campaign.status === "paused"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {campaign.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {campaign.status === "paused" && <Pause className="w-3 h-3 mr-1" />}
                      {campaign.status === "draft" && <Clock className="w-3 h-3 mr-1" />}
                      {campaign.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Campaign Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-800">{campaign.automationCount}</div>
                    <div className="text-xs text-purple-600">Automations</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-800">{campaign.postsCount}</div>
                    <div className="text-xs text-blue-600">Posts</div>
                  </div>
                </div>

                {/* Budget Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Budget Used</span>
                    <span className="font-medium">
                      ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {campaign.performance.impressions.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Impressions</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {campaign.performance.engagement.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{campaign.performance.roi}%</div>
                    <div className="text-xs text-gray-500">ROI</div>
                  </div>
                </div>

                {/* Campaign Category */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant="outline" className="text-xs">
                    <Folder className="w-3 h-3 mr-1" />
                    {campaign.category}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {campaign.startDate} - {campaign.endDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Campaigns Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== "all" || filterCategory !== "all"
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
        )}

        <CreateCampaignModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      </div>
    )
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
              <p className="text-gray-600 mt-1">{selectedCampaign.description}</p>
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
                selectedCampaign.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
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
                  {selectedCampaign.performance.impressions.toLocaleString()}
                </div>
                <p className="text-sm text-purple-600 mt-1">Total Impressions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800">
                  {selectedCampaign.performance.engagement.toLocaleString()}
                </div>
                <p className="text-sm text-green-600 mt-1">Total Engagement</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-800">{selectedCampaign.performance.conversions}</div>
                <p className="text-sm text-blue-600 mt-1">Conversions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-800">{selectedCampaign.performance.roi}%</div>
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
            <CardDescription>Weekly performance metrics for this campaign</CardDescription>
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
                <LineChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
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
                Assigned Automations ({selectedCampaign.automations.length})
              </CardTitle>
              <CardDescription>Automation rules assigned to this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedCampaign.automations.map((automation) => (
                <div
                  key={automation.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        automation.status === "active" ? "bg-gradient-to-r from-purple-100 to-pink-100" : "bg-gray-100"
                      }`}
                    >
                      <Zap
                        className={`w-4 h-4 ${automation.status === "active" ? "text-purple-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{automation.name}</p>
                      <p className="text-xs text-gray-500">{automation.type}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      automation.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
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
                Campaign Posts ({selectedCampaign.posts.length})
              </CardTitle>
              <CardDescription>Content and posts for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedCampaign.posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
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

        {/* Budget and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Budget</span>
                <span className="font-bold text-lg">${selectedCampaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Spent</span>
                <span className="font-bold text-lg text-red-600">${selectedCampaign.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Remaining</span>
                <span className="font-bold text-lg text-green-600">
                  ${(selectedCampaign.budget - selectedCampaign.spent).toLocaleString()}
                </span>
              </div>
              <Progress value={(selectedCampaign.spent / selectedCampaign.budget) * 100} className="h-3" />
              <p className="text-sm text-gray-500 text-center">
                {Math.round((selectedCampaign.spent / selectedCampaign.budget) * 100)}% of budget used
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Campaign Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">{selectedCampaign.startDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium">{selectedCampaign.endDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {Math.ceil(
                    (new Date(selectedCampaign.endDate).getTime() - new Date(selectedCampaign.startDate).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{" "}
                  days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <Badge
                  className={
                    selectedCampaign.status === "active"
                      ? "bg-green-100 text-green-700"
                      : selectedCampaign.status === "paused"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                  }
                >
                  {selectedCampaign.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
