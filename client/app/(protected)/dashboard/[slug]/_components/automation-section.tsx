"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Bar,
  BarChart,
} from "recharts";
import {
  Zap,
  Plus,
  Settings,
  MessageCircle,
  Send,
  Bot,
  Target,
  Clock,
  TrendingUp,
  ArrowLeft,
  Save,
  Trash2,
  Copy,
  Play,
  Pause,
  BarChart3,
  Eye,
} from "lucide-react";
import { CreateRuleModal } from "./create-rule-modal";
import { instagramAccountsProps, User } from "@/constant/types/auth";
import { AutomationProps } from "@/constant/types/automation";
import {
  useDeleteRuleMutation,
  useUpdateRuleMutation,
  useUpdateRuleStatusMutation,
} from "@/lib/redux/services/automation";
import Loader from "@/components/global/loader";
import {
  useGetEngagementQuery,
  useGetPerformanceSummaryQuery,
} from "@/lib/redux/services/engagement";
import { ConnectInstagramAccountModel } from "./connectInstagramAccount";

interface UserProps {
  user: User | null;
  automationRules: AutomationProps[] | undefined;
  instagramAccounts: instagramAccountsProps[] | undefined;
}

export function AutomationSection({
  user,
  automationRules,
  instagramAccounts,
}: UserProps) {
  const [currentView, setCurrentView] = useState<"list" | "detail" | "edit">(
    "list"
  );
  const [selectedRule, setSelectedRule] = useState<AutomationProps | null>(
    null
  );
  const [editingRule, setEditingRule] = useState<AutomationProps | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  const [updateRule, { isSuccess, isLoading }] = useUpdateRuleMutation();
  const [
    updateRuleStatus,
    { isSuccess: isStatusSuccess, isLoading: isLoadingStatus },
  ] = useUpdateRuleStatusMutation();

  const [deleteRule, { isSuccess: isDelSuccess, isLoading: isDelStatus }] =
    useDeleteRuleMutation();

  const { data: engagements } = useGetEngagementQuery();

  const {
    data = [],
    isLoading: isLoadingPerformance,
    error,
  } = useGetPerformanceSummaryQuery();

  useEffect(() => {
    if (isSuccess) {
      setCurrentView("list");
      setEditingRule(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isDelSuccess) {
      setCurrentView("list");
      setEditingRule(null);
    }
  }, [isDelSuccess]);

  useEffect(() => {
    if (isStatusSuccess) {
      setCurrentView("list");
      setEditingRule(null);
    }
  }, [isStatusSuccess]);

  const handleViewRule = (rule: AutomationProps) => {
    setSelectedRule(rule);
    setCurrentView("detail");
  };

  const handleEditRule = (rule: AutomationProps) => {
    setEditingRule({ ...rule });
    setCurrentView("edit");
  };

  const handleSaveRule = async () => {
    console.log("Saving rule:", editingRule);
    await updateRule(editingRule).unwrap();
  };

  const handleToggleStatus = async (status: AutomationProps) => {
    console.log("Saving status:", status.status);
    await updateRuleStatus({ id: status._id, status: status.status }).unwrap();
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedRule(null);
    setEditingRule(null);
  };

  const successRate =
    automationRules && automationRules.map((rule) => rule.successRate);
  const rate =
    successRate && successRate.reduce((a, b) => a + b, 0) / successRate.length;

  const totalTriggers =
    automationRules &&
    automationRules.reduce((total, rule) => total + rule.totalTriggers, 0);

  const avgResponseTime =
    automationRules &&
    automationRules.reduce((total, rule) => total + rule.avgResponseTime, 0) /
      automationRules.length;

  const handleDelete = async (id: string) => {
    console.log("Deleting rule:", id);
    await deleteRule(id).unwrap();
  };

  // List View
  if (currentView === "list") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Automation Rules
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage your Instagram automation campaigns.
            </p>
          </div>
          {instagramAccounts && instagramAccounts?.length === 0 ? (
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={() => setShowInstagramModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Connect Instagram Accounts
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Rule
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    Active Rules
                  </p>
                  <p className="text-2xl font-bold text-purple-800">
                    {automationRules ? automationRules.length : "0"}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    {rate ? rate : "0"}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Total Triggers
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {totalTriggers ? totalTriggers : 0}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">
                    Avg Response Time
                  </p>
                  <p className="text-2xl font-bold text-orange-800">
                    {avgResponseTime ? avgResponseTime.toFixed(1) : "0"}s
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Automation Rules */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Active Automation Rules
            </CardTitle>
            <CardDescription>
              Manage your current automation campaigns and rules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {instagramAccounts && automationRules ? (
              automationRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        rule.status === "active"
                          ? "bg-gradient-to-r from-purple-100 to-pink-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {rule.responseType === "COMMENT" ? (
                        <Bot
                          className={`w-6 h-6 ${
                            rule.status === "active"
                              ? "text-purple-600"
                              : "text-gray-400"
                          }`}
                        />
                      ) : (
                        <Target
                          className={`w-6 h-6 ${
                            rule.status === "active"
                              ? "text-purple-600"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {rule.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {rule.responseType} • {rule.trigger}
                      </p>
                      <p className="text-xs text-gray-400">
                        Last triggered:{" "}
                        {rule.lastTriggered instanceof Date
                          ? rule.lastTriggered.toLocaleString()
                          : rule.lastTriggered}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {rule.responses} responses
                      </p>
                      <p className="text-xs text-gray-500">
                        {rule.successRate}% success rate
                      </p>
                    </div>

                    <Badge
                      className={
                        rule.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {rule.status}
                    </Badge>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewRule(rule)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={rule.status === "active"}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRule(rule)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : instagramAccounts?.length === 0 ? (
              <Card className="border-0 shadow-lg flex items-center justify-center">
                <CardDescription>Connect Instagram Accounts.</CardDescription>
                <CardContent className="space-y-4">
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleConnect}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Connect Instagram Accounts
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">No automation rules found.</p>
                <p className="text-gray-500 pb-3">Start by creating a rule</p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rule Templates */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Rule Templates
            </CardTitle>
            <CardDescription>
              Quick start templates for common automation scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Welcome Series",
                  description:
                    "Automatically welcome new followers with a personalized message",
                  category: "DM",
                  icon: "👋",
                  popular: true,
                },
                {
                  name: "FAQ Responder",
                  description: "Auto-reply to common questions in comments",
                  category: "COMMENT",
                  icon: "❓",
                  popular: true,
                },
                {
                  name: "Product Showcase",
                  description:
                    "Send product details when users ask about items",
                  category: "DM",
                  icon: "🛍️",
                  popular: false,
                },
                {
                  name: "Event Promotion",
                  description: "Promote upcoming events to engaged users",
                  category: "DM",
                  icon: "🎉",
                  popular: false,
                },
                {
                  name: "Lead Qualification",
                  description: "Qualify leads based on comment interactions",
                  category: "COMMENT",
                  icon: "🎯",
                  popular: true,
                },
                {
                  name: "Feedback Collection",
                  description: "Collect customer feedback automatically",
                  category: "DM",
                  icon: "📝",
                  popular: false,
                },
              ].map((template, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  {template.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      Popular
                    </Badge>
                  )}
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <CreateRuleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          user={user}
        />
        <ConnectInstagramAccountModel
          isOpen={showInstagramModal}
          onClose={() => setShowInstagramModal(false)}
          user={user}
        />
      </div>
    );
  }

  // Detail View
  if (currentView === "detail" && selectedRule) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBackToList}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Rules
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {selectedRule.name}
              </h1>
              <p className="text-gray-600 mt-1">{selectedRule.desc}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleEditRule(selectedRule)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Rule
            </Button>
            <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button
              className={
                selectedRule.status === "active"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
              onClick={() => handleToggleStatus(selectedRule)}
              disabled={isLoadingStatus}
            >
              {selectedRule.status === "active" ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  {isLoadingStatus ? (
                    <Loader state={isLoadingStatus}>Loading...</Loader>
                  ) : (
                    "Pause"
                  )}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {isLoadingStatus ? (
                    <Loader state={isLoadingStatus}>Loading...</Loader>
                  ) : (
                    "Activate"
                  )}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Rule Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Rule Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedRule.responseType === "COMMENT" ? (
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Send className="w-5 h-5 text-purple-600" />
                  )}
                  Rule Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Rule Type
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRule.responseType}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Status
                    </Label>
                    <Badge
                      className={
                        selectedRule.status === "active"
                          ? "bg-green-100 text-green-700 mt-1"
                          : "bg-gray-100 text-gray-700 mt-1"
                      }
                    >
                      {selectedRule.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Created Date
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRule.createdAt}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Avg Response Time
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedRule.avgResponseTime}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Trigger Keywords
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRule.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-purple-50 text-purple-700"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Response Template
                  </Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">
                      {selectedRule.responseTemplate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Weekly Performance
                </CardTitle>
                <CardDescription>
                  Triggers and responses over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPerformance ? (
                  <Loader state={isLoadingPerformance}>
                    Loading performance data...
                  </Loader>
                ) : error ? (
                  <p className="text-red-500">Error loading performance data</p>
                ) : (
                  <ChartContainer
                    config={{
                      triggers: {
                        label: "Triggers",
                        color: "hsl(var(--chart-1))",
                      },
                      responses: {
                        label: "Responses",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-gray-200"
                        />
                        <XAxis dataKey="day" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="triggers"
                          fill="#8b5cf6"
                          radius={[2, 2, 0, 0]}
                        />
                        <Bar
                          dataKey="responses"
                          fill="#ec4899"
                          radius={[2, 2, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-800">
                    {selectedRule.responses}
                  </div>
                  <p className="text-sm text-purple-600 mt-1">
                    Total Responses
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">
                    {selectedRule.successRate}%
                  </div>
                  <p className="text-sm text-green-600 mt-1">Success Rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-800">
                    {selectedRule.totalTriggers}
                  </div>
                  <p className="text-sm text-blue-600 mt-1">Total Triggers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {engagements ? (
                  engagements.map((engagement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-xs"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          engagement.status === "SUCCESS"
                            ? "bg-green-500"
                            : engagement.status === "FAILED"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-gray-900">
                          {engagement.triggeredBy}
                        </p>
                        <p className="text-gray-500">
                          {new Date(engagement.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-900">No recent activity found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Edit View
  if (currentView === "edit" && editingRule) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBackToList}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Rules
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Edit Rule: {editingRule.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Modify your automation rule settings
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleBackToList}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={handleSaveRule}
              disabled={isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? (
                <Loader state={isLoading}>Loading...</Loader>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Configure the basic settings for your automation rule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ruleName">Rule Name</Label>
                  <Input
                    id="ruleName"
                    value={editingRule.name}
                    onChange={(e) =>
                      setEditingRule({ ...editingRule, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingRule.desc}
                    onChange={(e) =>
                      setEditingRule({
                        ...editingRule,
                        desc: e.target.value,
                      })
                    }
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ruleType">Rule Type</Label>
                    <Select value={editingRule.responseType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DM">DM</SelectItem>
                        <SelectItem value="COMMENT">COMMENT</SelectItem>
                        <SelectItem value="Story Reply">Story Reply</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={editingRule.status}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Trigger Configuration</CardTitle>
                <CardDescription>
                  Set up when this automation should be triggered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="keywords">Trigger Keywords</Label>
                  <Input
                    id="keywords"
                    value={editingRule.keywords.join(", ")}
                    onChange={(e) =>
                      setEditingRule({
                        ...editingRule,
                        keywords: e.target.value
                          .split(",")
                          .map((k) => k.trim()),
                      })
                    }
                    className="mt-1"
                    placeholder="Enter keywords separated by commas"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple keywords with commas
                  </p>
                </div>

                <div>
                  <Label htmlFor="responseTemplate">Response Template</Label>
                  <Textarea
                    id="responseTemplate"
                    value={editingRule.responseTemplate}
                    onChange={(e) =>
                      setEditingRule({
                        ...editingRule,
                        responseTemplate: e.target.value,
                      })
                    }
                    className="mt-1"
                    rows={4}
                    placeholder="Enter your automated response message..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use emojis and personalization to make your responses more
                    engaging
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Preview</CardTitle>
                <CardDescription className="text-xs">
                  How your automation will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-700">
                      Rule Name:
                    </p>
                    <p className="text-sm text-gray-900">{editingRule.name}</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-700">
                      Triggers on:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {editingRule.keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs font-medium text-purple-700">
                      Response:
                    </p>
                    <p className="text-sm text-purple-900 mt-1">
                      {editingRule.responseTemplate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Case Sensitive</p>
                    <p className="text-xs text-gray-500">
                      Match exact case for keywords
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Rate Limiting</p>
                    <p className="text-xs text-gray-500">
                      Prevent spam responses
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Analytics Tracking</p>
                    <p className="text-xs text-gray-500">
                      Track performance metrics
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg border-red-200">
              <CardHeader>
                <CardTitle className="text-sm text-red-700">
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  disabled={isDelStatus}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  onClick={() => handleDelete(editingRule._id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDelStatus ? (
                    <Loader state={isDelStatus}>Loading...</Loader>
                  ) : (
                    "Delete Rule"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
