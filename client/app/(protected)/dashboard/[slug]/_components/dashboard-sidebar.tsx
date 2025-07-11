"use client";

import {
  Home,
  Settings,
  Zap,
  Instagram,
  BarChart3,
  Bell,
  HelpCircle,
  LogOut,
  Target,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SubscriptionPlan } from "@/components/global/Subscription-plan";
import UpgradeCard from "./upgrade";
import { useAppSelector } from "@/lib/hooks";
import { OnUserInfo } from "@/app/actions/user";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  {
    title: "Home",
    icon: Home,
    id: "home",
  },
  {
    title: "Integration",
    icon: Instagram,
    id: "integration",
  },
  {
    title: "Automation",
    icon: Zap,
    id: "automation",
  },
  {
    title: "Campaigns",
    icon: Target,
    id: "campaigns",
  },
];

const secondaryItems = [
  {
    title: "Analytics",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Notifications",
    icon: Bell,
    id: "notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
];

export function DashboardSidebar({
  activeSection,
  setActiveSection,
}: DashboardSidebarProps) {
  const { user: userInfo } = useAppSelector((state) => state.auth);
  const { user } = OnUserInfo(userInfo?._id || "");

  return (
    <Sidebar className="border-r border-purple-100">
      <SidebarHeader className="border-b border-purple-100 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AutoGram
            </span>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-700 font-semibold">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 hover:bg-purple-50"
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-700 font-semibold">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 hover:bg-purple-50"
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SubscriptionPlan type={user?.subscription?.plan ?? "FREE"}>
                <div className="flex-1 flex flex-col justify-end">
                  <UpgradeCard />
                </div>
              </SubscriptionPlan>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-purple-50">
              <button className="w-full">
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-red-50 hover:text-red-600"
            >
              {user && (
                <button
                  className="w-full"
                  onClick={() => (window.location.href = "/")}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
