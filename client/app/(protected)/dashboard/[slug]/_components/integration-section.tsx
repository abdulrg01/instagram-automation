"use client";

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
import {
  Instagram,
  CheckCircle,
  AlertCircle,
  Settings,
  RefreshCw,
  ExternalLink,
  Shield,
  Key,
  Zap,
} from "lucide-react";
import Loader from "@/components/global/loader";
import { useTokenRefreshMutation } from "@/lib/redux/services/meta";
import { useEffect } from "react";
import { instagramAccountsProps } from "@/constant/types/auth";

interface UserProps {
  instagramAccounts: instagramAccountsProps[] | undefined;
  refetch: () => void;
}

export function IntegrationSection({ instagramAccounts, refetch }: UserProps) {
  const [tokenRefresh, { isSuccess, isLoading }] = useTokenRefreshMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

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

  const handleRefresh = async (id: string) => {
    await tokenRefresh(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Integrations
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your Instagram connections and API integrations.
          </p>
        </div>
        <Button
          onClick={handleConnect}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <Instagram className="w-4 h-4 mr-2" />
          Connect Instagram Account
        </Button>
      </div>

      {/* Instagram Accounts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-purple-600" />
            Connected Instagram Accounts
          </CardTitle>
          <CardDescription>
            Manage your Instagram Business accounts and their API connections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {instagramAccounts && instagramAccounts?.length > 0 ? (
            instagramAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {account.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {account.followers} followers
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Token expires in {account.tokenExpiresAt}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last sync:{" "}
                      {account.lastSync instanceof Date
                        ? account.lastSync.toLocaleString()
                        : account.lastSync}
                    </p>
                  </div>

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

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleRefresh(account._id)}
                      variant="outline"
                      size="sm"
                    >
                      {isLoading ? (
                        <Loader state>loading...</Loader>
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 hover:opacity-80" />
                    </Button>
                  </div>
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
                  onClick={handleConnect}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Connect Account
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* API Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-600" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Configure your Instagram Graph API settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Token Refresh</p>
                  <p className="text-sm text-gray-500">
                    Automatically refresh access tokens before expiry
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Webhook Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive real-time updates via webhooks
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rate Limit Protection</p>
                  <p className="text-sm text-gray-500">
                    Automatically throttle requests to avoid limits
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View API Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Security & Permissions
            </CardTitle>
            <CardDescription>
              Manage security settings and API permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { permission: "Read Posts", status: "granted", required: true },
                {
                  permission: "Read Comments",
                  status: "granted",
                  required: true,
                },
                {
                  permission: "Manage Comments",
                  status: "granted",
                  required: true,
                },
                {
                  permission: "Send Messages",
                  status: "granted",
                  required: true,
                },
                {
                  permission: "Read Insights",
                  status: "granted",
                  required: false,
                },
                {
                  permission: "Manage Media",
                  status: "pending",
                  required: false,
                },
              ].map((perm, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{perm.permission}</p>
                    <p className="text-xs text-gray-500">
                      {perm.required ? "Required" : "Optional"}
                    </p>
                  </div>
                  <Badge
                    className={
                      perm.status === "granted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {perm.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Review Permissions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third-party Integrations */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Third-party Integrations
          </CardTitle>
          <CardDescription>
            Connect with other tools and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Zapier",
                description: "Connect with 5000+ apps",
                status: "available",
                icon: "⚡",
              },
              {
                name: "Slack",
                description: "Get notifications in Slack",
                status: "connected",
                icon: "💬",
              },
              {
                name: "Google Analytics",
                description: "Track campaign performance",
                status: "available",
                icon: "📊",
              },
              {
                name: "Mailchimp",
                description: "Sync email subscribers",
                status: "available",
                icon: "📧",
              },
              {
                name: "HubSpot",
                description: "CRM integration",
                status: "available",
                icon: "🎯",
              },
              {
                name: "Shopify",
                description: "E-commerce integration",
                status: "connected",
                icon: "🛍️",
              },
            ].map((integration, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{integration.icon}</span>
                    <h3 className="font-semibold">{integration.name}</h3>
                  </div>
                  <Badge
                    className={
                      integration.status === "connected"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {integration.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {integration.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={integration.status === "connected"}
                >
                  {integration.status === "connected" ? "Connected" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
