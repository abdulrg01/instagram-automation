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
  Instagram,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  Plus,
} from "lucide-react";
import { useGetInstagramAccountsQuery } from "@/lib/redux/services/meta";
import { User } from "@/constant/types/auth";
import { instagramAccountsProps } from "@/constant/types/auth";
import { useCreateRuleMutation } from "@/lib/redux/services/automation";
import Loader from "@/components/global/loader";
import { ConnectInstagramAccountModel } from "./connectInstagramAccount";

interface CreateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function CreateRuleModal({
  isOpen,
  onClose,
  user,
}: CreateRuleModalProps) {
  const { data: connectedAccounts, refetch } = useGetInstagramAccountsQuery(
    user?._id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const [createRule, { isSuccess, isLoading }] = useCreateRuleMutation();
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  const [currentStep, setCurrentStep] = useState<"accounts" | "form">(
    "accounts"
  );
  const [selectedAccount, setSelectedAccount] =
    useState<instagramAccountsProps | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    trigger: "",
    keywords: "",
    responseType: "",
    desc: "",
    responseTemplate: "",
    instagramAccountId: "",
    status: "active",
    caseSensitive: false,
    rateLimiting: true,
    analyticsTracking: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        trigger: "",
        keywords: "",
        responseType: "",
        desc: "",
        responseTemplate: "",
        instagramAccountId: "",
        status: "active",
        caseSensitive: false,
        rateLimiting: true,
        analyticsTracking: true,
      });
      refetch();
      setCurrentStep("accounts");
      setSelectedAccount(null);
      onClose();
    }
  }, [
    isSuccess,
    setFormData,
    setCurrentStep,
    setSelectedAccount,
    onClose,
    refetch,
  ]);

  const handleAccountSelect = (account: instagramAccountsProps) => {
    setSelectedAccount(account);
    setCurrentStep("form");
  };

  const handleBackToAccounts = () => {
    setCurrentStep("accounts");
    setSelectedAccount(null);
  };

  const handleSaveRule = async () => {
    const ruleData = {
      ...formData,
      instagramAccountId: selectedAccount?._id,
      keywords: formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0),
      responseType: formData.responseType as "DM" | "COMMENT",
    };

    console.log("Creating new rule:", ruleData);
    await createRule(ruleData).unwrap();
  };

  const handleClose = () => {
    setCurrentStep("accounts");
    setSelectedAccount(null);
    setFormData({
      name: "",
      trigger: "",
      keywords: "",
      responseType: "",
      desc: "",
      responseTemplate: "",
      instagramAccountId: "",
      status: "active",
      caseSensitive: false,
      rateLimiting: true,
      analyticsTracking: true,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        {currentStep === "accounts" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" />
                Create New Automation Rule
              </DialogTitle>
              <DialogDescription>
                Select an Instagram account to create an automation rule for
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-6">
              <div className="text-sm font-medium text-gray-700 mb-4">
                Connected Instagram Accounts (
                {connectedAccounts && connectedAccounts.length})
              </div>

              <div className="grid gap-4">
                {connectedAccounts ? (
                  connectedAccounts.map((account) => (
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
                              ) : account.status === "warning" ? (
                                <>
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Expiring Soon
                                </>
                              ) : (
                                <span className="ml-1">Disconnected</span>
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
                  <div className="text-center py-12">
                    <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Connected Accounts
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Connect an Instagram Business account to create automation
                      rules.
                    </p>
                    <Button
                      onClick={() => setShowInstagramModal(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Connect Instagram Account
                    </Button>
                  </div>
                )}
              </div>

              {connectedAccounts && connectedAccounts.length === 0 && (
                <div className="text-center py-12">
                  <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Connected Accounts
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Connect an Instagram Business account to create automation
                    rules.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Instagram className="w-4 h-4 mr-2" />
                    Connect Instagram Account
                  </Button>
                </div>
              )}
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
                    Create Rule for {selectedAccount?.username}
                  </DialogTitle>
                  <DialogDescription>
                    Configure your new automation rule for this Instagram
                    account
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
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Configure the basic settings for your automation rule
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ruleName">Rule Name *</Label>
                      <Input
                        id="ruleName"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1"
                        placeholder="e.g., Welcome New Followers"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.desc}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            desc: e.target.value,
                          })
                        }
                        className="mt-1"
                        rows={3}
                        placeholder="Describe what this automation rule does..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ruleType">Rule Type *</Label>
                        <Select
                          value={formData.responseType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, responseType: value })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select rule type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DM">DM</SelectItem>
                            <SelectItem value="COMMENT">COMMENT</SelectItem>
                            <SelectItem value="Story Reply">
                              Story Reply
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

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
                            <SelectItem value="draft">inactive</SelectItem>
                            <SelectItem value="paused">completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trigger Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trigger Configuration</CardTitle>
                    <CardDescription>
                      Set up when this automation should be triggered
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="keywords">Trigger Keywords *</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) =>
                          setFormData({ ...formData, keywords: e.target.value })
                        }
                        className="mt-1"
                        placeholder="price, cost, buy, help, support"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Separate multiple keywords with commas
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="responseTemplate">
                        Response Template *
                      </Label>
                      <Textarea
                        id="responseTemplate"
                        value={formData.responseTemplate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            responseTemplate: e.target.value,
                          })
                        }
                        className="mt-1"
                        rows={4}
                        placeholder="Hi there! 👋 Thanks for your interest. How can we help you today?"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Use emojis and personalization to make your responses
                        more engaging
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview & Settings Sidebar */}
              <div className="space-y-6">
                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Preview</CardTitle>
                    <CardDescription className="text-xs">
                      How your automation will work
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700">
                        Rule Name:
                      </p>
                      <p className="text-sm text-gray-900">
                        {formData.name || "Untitled Rule"}
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700">Type:</p>
                      <p className="text-sm text-gray-900">
                        {formData.responseType || "Not selected"}
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700">
                        Triggers on:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.keywords.split(",").map(
                          (keyword, index) =>
                            keyword.trim() && (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {keyword.trim()}
                              </Badge>
                            )
                        )}
                        {!formData.keywords && (
                          <span className="text-xs text-gray-400">
                            No keywords set
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs font-medium text-purple-700">
                        Response:
                      </p>
                      <p className="text-sm text-purple-900 mt-1">
                        {formData.responseTemplate ||
                          "No response template set"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Settings */}
                <Card>
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
                      <Switch
                        checked={formData.caseSensitive}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, caseSensitive: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Rate Limiting</p>
                        <p className="text-xs text-gray-500">
                          Prevent spam responses
                        </p>
                      </div>
                      <Switch
                        checked={formData.rateLimiting}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, rateLimiting: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Analytics Tracking
                        </p>
                        <p className="text-xs text-gray-500">
                          Track performance metrics
                        </p>
                      </div>
                      <Switch
                        checked={formData.analyticsTracking}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            analyticsTracking: checked,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleSaveRule}
                    disabled={
                      !formData.name ||
                      !formData.responseType ||
                      !formData.keywords ||
                      !formData.responseTemplate
                    }
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? (
                      <Loader state={isLoading}>
                        <span className="hidden md:flex">Create Rule</span>
                      </Loader>
                    ) : (
                      "Create Rule"
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
        <ConnectInstagramAccountModel
          isOpen={showInstagramModal}
          onClose={() => setShowInstagramModal(false)}
          user={user}
        />
      </DialogContent>
    </Dialog>
  );
}
