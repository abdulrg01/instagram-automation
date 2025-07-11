import { AutomationProps } from "./automation";

export interface instagramAccountsProps {
  _id: string;
  igBusinessId: string;
  pageId: string;
  accessToken: string;
  tokenExpiresAt: string;
  followers: number;
  status: "connected" | "warning" | "expired";
  profilePic: string;
  connectedAt: string;
  instagramId: string;
  username: string;
  lastSync: Date;
}

interface Subscription {
  _id: string;
  plan: "PRO" | "FREE";
  createdAt: Date;
  customerId: string;
}

interface CampaignProps {
  _id: string;
  instagramAccounts: instagramAccountsProps[];
  name: string;
  description: string;
  postIds: string[];
  createdAt: string;
  assignedRules: AutomationProps[];
  status: "active" | "inactive" | "completed";
}

interface engagementLogProps {
  _id: string;
  instagramAccounts: instagramAccountsProps[];
  postId: string;
  triggeredBy: string;
  triggerType: "comment" | "dm";
  responseSent: boolean;
  responseContent: string;
  createdAt: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  createdAt?: string;
  subscription: Subscription;
  automation: AutomationProps[];
  instagramAccounts: instagramAccountsProps[];
  campaign: CampaignProps[];
  engagementLogSchema: engagementLogProps[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RefreshInstagramStatus {
  success: boolean;
  message: string;
  refreshed: number;
  failed: number;
  user: User;
  errors: { integrationId: string; error: string }[];
}
