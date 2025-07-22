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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { instagramAccountsProps } from "@/constant/types/auth";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Loader from "@/components/global/loader";
import { useCreateAppMutation } from "@/lib/redux/services/app";

interface CreateAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAccount({ isOpen, onClose }: CreateAppProps) {
  const [createApp, { isSuccess, isLoading }] = useCreateAppMutation();

  const [selectedAccount, setSelectedAccount] =
    useState<instagramAccountsProps | null>(null);

  const [formData, setFormData] = useState({
    appName: "",
    appId: "",
    appSecret: "",
    igVerifyToken: "",
    igAccessToken: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        appName: "",
        appId: "",
        appSecret: "",
        igVerifyToken: "",
        igAccessToken: "",
      });
      setSelectedAccount(null);
      onClose();
    }
  }, [isSuccess, setFormData, setSelectedAccount, onClose]);

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
    await createApp(ruleData).unwrap();
  };

  const handleClose = () => {
    setFormData({
      appName: "",
      appId: "",
      appSecret: "",
      igVerifyToken: "",
      igAccessToken: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div>
            <DialogTitle className="flex items-center gap-2">
              Create App
            </DialogTitle>
            <DialogDescription>
              Configure your new app for this Instagram account
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-6">
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
                <Label htmlFor="appName">App Name *</Label>
                <Input
                  id="appName"
                  value={formData.appName}
                  onChange={(e) =>
                    setFormData({ ...formData, appName: e.target.value })
                  }
                  className="mt-1"
                  placeholder="e.g., Enter your facebook app name"
                />
              </div>

              <div>
                <Label htmlFor="appId">Facebook App ID</Label>
                <Input
                  id="appId"
                  value={formData.appId}
                  onChange={(e) =>
                    setFormData({ ...formData, appId: e.target.value })
                  }
                  className="mt-1"
                  placeholder="e.g., Enter your facebook app ID"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Facebook App Secret</CardTitle>
              <CardDescription>Set up when this Secret</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="appSecret">Facebook App Secret *</Label>
                <Input
                  id="appSecret"
                  value={formData.appSecret}
                  onChange={(e) =>
                    setFormData({ ...formData, appSecret: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter your facebook app secret"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Facebook App Configuration</CardTitle>
              <CardDescription>Set up when this configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="appSecret">Facebook App Secret *</Label>
                <Input
                  id="appSecret"
                  value={formData.appSecret}
                  onChange={(e) =>
                    setFormData({ ...formData, appSecret: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter your facebook app secret"
                />
              </div>

              <div>
                <Label htmlFor="igVerifyToken">
                  Facebook Instagram Verify Token *
                </Label>
                <Input
                  id="igVerifyToken"
                  value={formData.igVerifyToken}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      igVerifyToken: e.target.value,
                    })
                  }
                  className="mt-1"
                  placeholder="Enter your instagram verify token"
                />
              </div>
              <div>
                <Label htmlFor="igAccessToken">
                  Facebook Instagram Access Token *
                </Label>
                <Input
                  id="igAccessToken"
                  value={formData.igAccessToken}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      igAccessToken: e.target.value,
                    })
                  }
                  className="mt-1"
                  placeholder="Enter your instagram access token"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={handleSaveRule}
            disabled={
              !formData.appId ||
              !formData.appSecret ||
              !formData.igAccessToken ||
              !formData.igVerifyToken
            }
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? (
              <Loader state={isLoading}>Loading...</Loader>
            ) : (
              "Create App"
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
      </DialogContent>
    </Dialog>
  );
}
