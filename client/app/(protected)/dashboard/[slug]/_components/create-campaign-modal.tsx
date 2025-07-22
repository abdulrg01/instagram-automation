"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Save,
  Bot,
  MessageCircle,
  CheckCircle,
  Instagram,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import {
  useCreateCampaignMutation,
  useGetCampaignsQuery,
} from "@/lib/redux/services/campaign";
import Loader from "@/components/global/loader";
import { useGetInstagramAccountsQuery } from "@/lib/redux/services/meta";
import { instagramAccountsProps, User } from "@/constant/types/auth";
import { useGetUserRulesQuery } from "@/lib/redux/services/automation";
import { CreateRuleModal } from "./create-rule-modal";
import { ConnectInstagramAccountModel } from "./connectInstagramAccount";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function CreateCampaignModal({
  isOpen,
  onClose,
  user,
}: CreateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState<"accounts" | "form">(
    "accounts"
  );
  const { data: automationRules } = useGetUserRulesQuery(user?._id);
  const [createCampaign, { isSuccess, isLoading }] =
    useCreateCampaignMutation();
  const { data: instagramAccounts = [] } = useGetInstagramAccountsQuery(
    user?._id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const { data: campaigns = [] } = useGetCampaignsQuery();
  const [selectedAccount, setSelectedAccount] =
    useState<Partial<instagramAccountsProps> | null>(null);

  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    status: "active",
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        description: "",
        category: "",
        status: "active",
      });
      setSelectedAutomations([]);
      setSelectedPosts([]);
      setCurrentStep("accounts");
      setSelectedAccount(null);
      onClose();
    }
  }, [isSuccess, onClose]);

  const handleAccountSelect = (account: Partial<instagramAccountsProps>) => {
    setSelectedAccount(account);
    setCurrentStep("form");
  };

  const handleBackToAccounts = () => {
    setCurrentStep("accounts");
    setSelectedAccount(null);
  };

  const handleSaveCampaign = async () => {
    const campaignData = {
      ...formData,
      assignedRules: selectedAutomations,
      posts: selectedPosts,
      instagramAccountId: selectedAccount?._id,
    };
    await createCampaign(campaignData);
    console.log("Creating new campaign:", campaignData);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      status: "active",
    });
    setSelectedAutomations([]);
    setSelectedPosts([]);
    setCurrentStep("accounts");
    setSelectedAccount(null);
    onClose();
  };

  const toggleAutomation = (automationId: string) => {
    setSelectedAutomations((prev) =>
      prev.includes(automationId)
        ? prev.filter((id) => id !== automationId)
        : [...prev, automationId]
    );
  };

  const togglePost = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        {currentStep === "accounts" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" />
                Create New Campaign
              </DialogTitle>
              <DialogDescription>
                Select an Instagram account to create a campaign for
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-6">
              <div className="text-sm font-medium text-gray-700 mb-4">
                Connected Instagram Accounts ({instagramAccounts.length})
              </div>

              <div className="grid gap-4">
                {instagramAccounts && instagramAccounts?.length > 0 ? (
                  instagramAccounts.map((account) => (
                    <Card
                      key={account._id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-purple-300 border-2"
                      onClick={() => handleAccountSelect(account)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                              <Instagram className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {account.username}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {account.followers} followers •{" "}
                                {account.username}
                              </p>
                              <p className="text-xs text-gray-400">
                                Last sync:{" "}
                                {account.lastSync instanceof Date
                                  ? account.lastSync.toLocaleString()
                                  : account.lastSync}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Badge
                              className={
                                account.status === "connected"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {account.status === "connected" ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Connected
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Warning
                                </>
                              )}
                            </Badge>
                            <div className="text-purple-600">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-0 shadow-lg flex items-center justify-center">
                    <CardDescription>
                      No Connected Instagram Accounts yet
                    </CardDescription>
                    <CardContent className="space-y-4">
                      <Button
                        onClick={() => setShowInstagramModal(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        Connect Instagram Account
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToAccounts}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <DialogTitle className="flex items-center gap-2">
                    Create Campaign for {selectedAccount?.username}
                  </DialogTitle>
                  <DialogDescription>
                    Configure your new campaign for this Instagram account
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Selected Account Info */}
                <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">
                          Selected Account
                        </p>
                        <p className="text-sm text-purple-700">
                          {selectedAccount?.username} •{" "}
                          {selectedAccount?.followers} followers
                        </p>
                        <p className="text-xs text-purple-600">
                          ID: {selectedAccount?._id}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                    <CardDescription>
                      Configure the basic settings for your campaign
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="campaignName">Campaign Name *</Label>
                      <Input
                        id="campaignName"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1"
                        placeholder="e.g., Summer Collection Launch"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="mt-1"
                        rows={3}
                        placeholder="Describe your campaign goals and strategy..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Product Launch">
                              Product Launch
                            </SelectItem>
                            <SelectItem value="Sales Event">
                              Sales Event
                            </SelectItem>
                            <SelectItem value="Customer Service">
                              Customer Service
                            </SelectItem>
                            <SelectItem value="Brand Awareness">
                              Brand Awareness
                            </SelectItem>
                            <SelectItem value="Lead Generation">
                              Lead Generation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Assign Automations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-600" />
                      Assign Automations
                    </CardTitle>
                    <CardDescription>
                      Select automation rules to include in this campaign
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {automationRules && automationRules.length > 0 ? (
                        automationRules.map((automation) => (
                          <div
                            key={automation._id}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedAutomations.includes(automation._id)
                                ? "border-purple-300 bg-purple-50"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => toggleAutomation(automation._id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  selectedAutomations.includes(automation._id)
                                    ? "bg-gradient-to-r from-purple-100 to-pink-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <Bot
                                  className={`w-4 h-4 ${
                                    selectedAutomations.includes(automation._id)
                                      ? "text-purple-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  {automation.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {automation.responseType}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={
                                  automation.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }
                              >
                                {automation.status}
                              </Badge>
                              {selectedAutomations.includes(automation._id) && (
                                <CheckCircle className="w-5 h-5 text-purple-600" />
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <Card className="border-0 shadow-lg flex items-center justify-center">
                          <CardDescription>
                            No Connected Instagram Accounts yet
                          </CardDescription>
                          <CardContent className="space-y-4">
                            <Button
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                              onClick={() => setShowCreateModal(true)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Create Rule
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Assign Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                      Assign Posts
                    </CardTitle>
                    <CardDescription>
                      Select posts and content to include in this campaign
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {campaigns && campaigns.length > 0 ? (
                        campaigns.map((post) => {
                          return post.postsData.map((p) => (
                            <div
                              key={p.id}
                              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                                selectedPosts.includes(p.id)
                                  ? "border-purple-300 bg-purple-50"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => togglePost(p.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    selectedPosts.includes(p.id)
                                      ? "bg-gradient-to-r from-blue-100 to-cyan-100"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  <MessageCircle
                                    className={`w-4 h-4 ${
                                      selectedPosts.includes(p.id)
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {p.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {p.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={
                                    p.status === "published"
                                      ? "bg-green-100 text-green-700"
                                      : p.status === "scheduled"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                                  }
                                >
                                  {p.status}
                                </Badge>
                                {selectedPosts.includes(p.id) && (
                                  <CheckCircle className="w-5 h-5 text-purple-600" />
                                )}
                              </div>
                            </div>
                          ));
                        })
                      ) : (
                        <Card className="border-0 shadow-lg flex items-center justify-center">
                          <CardDescription>
                            No Instagram Post Connected yet
                          </CardDescription>
                        </Card>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Sidebar */}
              <div className="space-y-6">
                {/* Campaign Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Campaign Preview</CardTitle>
                    <CardDescription className="text-xs">
                      How your campaign will appear
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700">
                        Campaign Name:
                      </p>
                      <p className="text-sm text-gray-900">
                        {formData.name || "Untitled Campaign"}
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700">
                        Category:
                      </p>
                      <p className="text-sm text-gray-900">
                        {formData.category || "Not selected"}
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs font-medium text-purple-700">
                        Selected Items:
                      </p>
                      <p className="text-sm text-purple-900 mt-1">
                        {selectedAutomations.length} Automations,{" "}
                        {selectedPosts.length} Posts
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Campaign Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Campaign Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="status">Initial Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="active">active</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Auto-start</p>
                        <p className="text-xs text-gray-500">
                          Start automatically on start date
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Email Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          Get updates about campaign performance
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleSaveCampaign}
                    disabled={!formData.name || !formData.category}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? (
                      <Loader state={isLoading}>Loading...</Loader>
                    ) : (
                      "Create Campaign"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
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
      </DialogContent>
    </Dialog>
  );
}
