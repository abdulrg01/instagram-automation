"use client";

import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { HomeSection } from "./_components/home-section";
import { IntegrationSection } from "./_components/integration-section";
import { AutomationSection } from "./_components/automation-section";
import { useAppSelector } from "@/lib/hooks";
import { useGetUserRulesQuery } from "@/lib/redux/services/automation";
import { useGetInstagramAccountsQuery } from "@/lib/redux/services/meta";
import { CampaignManagement } from "./_components/campaign-management";
// import { useAppSelector } from "@/lib/hooks";
// import { redirect } from "next/navigation";

const Layout = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { user } = useAppSelector((state) => state.auth);
  const { data: automationRules } = useGetUserRulesQuery(user?._id);
  const { data: instagramAccounts, refetch } = useGetInstagramAccountsQuery(
    user?._id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  // if (typeof window !== undefined) {
  //   if (!user) return redirect("/auth/sign-in");
  // }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection user={user} />;
      case "integration":
        return (
          <IntegrationSection
            instagramAccounts={instagramAccounts}
            refetch={refetch}
          />
        );
      case "automation":
        return (
          <AutomationSection
            automationRules={automationRules}
            user={user}
            instagramAccounts={instagramAccounts}
          />
        );
      case "campaigns":
        return <CampaignManagement user={user} />;
      default:
        return <HomeSection user={user} />;
    }
  };

  const getBreadcrumbTitle = () => {
    switch (activeSection) {
      case "home":
        return "Dashboard Overview";
      case "integration":
        return "Integrations";
      case "automation":
        return "Automation Rules";
      case "campaigns":
        return "Campaign Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <SidebarProvider>
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  AutoGram Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
          {renderActiveSection()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
