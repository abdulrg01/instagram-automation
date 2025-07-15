"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  Plus,
} from "lucide-react";
import { User } from "@/constant/types/auth";

// Mock data for connected Instagram accounts
const connectedAccounts = [
  {
    id: "ig_account_1",
    username: "@fashionbrand",
    followers: "125K",
    status: "connected",
    profileImage: "/placeholder.svg?height=40&width=40",
    businessType: "Fashion & Beauty",
    lastSync: "2 minutes ago",
  },
  {
    id: "ig_account_2",
    username: "@lifestyle_store",
    followers: "89K",
    status: "connected",
    profileImage: "/placeholder.svg?height=40&width=40",
    businessType: "Lifestyle",
    lastSync: "5 minutes ago",
  },
  {
    id: "ig_account_3",
    username: "@tech_reviews_hub",
    followers: "67K",
    status: "warning",
    profileImage: "/placeholder.svg?height=40&width=40",
    businessType: "Technology",
    lastSync: "1 hour ago",
  },
];

interface CreateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function ConnectInstagramAccountModel({
  isOpen,
  onClose,
}: CreateRuleModalProps) {
  const [currentStep, setCurrentStep] = useState<"accounts" | "form">(
    "accounts"
  );
  const [selectedAccount, setSelectedAccount] = useState<
    (typeof connectedAccounts)[0] | null
  >(null);

  const handleAccountSelect = (account: (typeof connectedAccounts)[0]) => {
    setSelectedAccount(account);
    setCurrentStep("form");
  };

  const handleBackToAccounts = () => {
    setCurrentStep("accounts");
    setSelectedAccount(null);
  };

  const handleClose = () => {
    setCurrentStep("accounts");
    setSelectedAccount(null);

    onClose();
  };

  const handleConnect = () => {
    const scope = [
      "pages_show_list",
      "instagram_basic",
      "pages_read_engagement",
      "instagram_manage_messages",
    ].join(",");

    const fbLoginUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=${scope}&response_type=code`;

    window.location.href = fbLoginUrl;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="ma6xl max-h-[90vh] overflow-y-auto">
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
                Connected Instagram Accounts ({connectedAccounts.length})
              </div>

              <div className="grid gap-4">
                {connectedAccounts.map((account) => (
                  <Card
                    key={account.id}
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
                              {account.businessType}
                            </p>
                            <p className="text-xs text-gray-400">
                              Last sync: {account.lastSync}
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
                ))}
              </div>

              {connectedAccounts.length === 0 && (
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
                    Connect Account
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
                  <DialogTitle className="flex items-center gap-3">
                    Connect account for {selectedAccount?.username}
                  </DialogTitle>
                  <DialogDescription className="py-2">
                    Configure your new Instagram account for Instagram
                    automation
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
                          ID: {selectedAccount?.id}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview & Settings Sidebar */}
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleConnect}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Connect Account
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
      </DialogContent>
    </Dialog>
  );
}
