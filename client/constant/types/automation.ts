import { instagramAccountsProps, User } from "./auth";

export interface InstagramPostsProps {
  id: string;
  caption?: string;
  media_url: string;
  timestamp?: Date;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  title?: string;
  type?: string;
  engagement?: number;
}

interface DmProps {
  senderId: string;
  receiver: string;
  message: string;
  prompt: string;
  createdAt: string;
  automationId: string;
}

export interface SavePostsProps {
  postId: string;
  caption?: string;
  media: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

export interface PerformanceDataPoint {
  day: string; // Mon, Tue, etc.
  triggers: number;
  responses: number;
  successRate: number;
}

export interface engagementLogProps {
  instagramAccounts: instagramAccountsProps;
  postId: string;
  triggeredBy: string;
  triggerType: "COMMENT" | "DM";
  responseSent: boolean;
  responseContent: string;
  status: "SUCCESS" | "FAILED";
  timestamp: Date;
}

export interface EngagementSummary {
  message: string;
  timestamp: string;
  responseSent: boolean;
}

export interface MonthlyEngagement {
  month: string;
  respondToComment: number;
  dms: number;
  engagement: number;
}

type CampaignPerformance = {
  impressions: number;
  engagement: number;
  conversions: number;
  roi: number;
};

export interface CampaignProps {
  _id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  startDate: string;
  instagramAccountId: string;
  performance: CampaignPerformance;
  automations: AutomationProps[];
  posts: InstagramPostsProps[];
}

interface StatWithChange {
  count: number;
  change: number | null;
}

export interface HomeStats {
  autoReplies: StatWithChange;
  dmsSent: StatWithChange;
  comments: StatWithChange;
}

export interface AutomationProps {
  _id: string;
  userId: User;
  name: string;
  responseType: "COMMENT" | "DM";
  trigger: string;
  status: "active" | "inactive" | "completed";
  responses: number;
  successRate: number;
  lastTriggered: Date;
  desc: string;
  comments: number;
  dmCounts: number;
  keywords: string[];
  responseTemplate: string;
  avgResponseTime: number;
  totalTriggers: number;
  recentActivities: engagementLogProps[];
  instagramAccounts: instagramAccountsProps[];
  listener: "SMARTAI" | "MESSAGE";
  posts: InstagramPostsProps[];
  dms: DmProps[];
  createdAt: string;
}
