import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Bell,
  Bot,
  Instagram,
  MessageCircle,
  Send,
  Settings,
  Shield,
  Target,
  Users,
  Webhook,
} from "lucide-react";
import React from "react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Powerful Automation Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to automate your Instagram presence and grow
            your audience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Instagram,
              title: "Instagram Graph API Integration",
              description:
                "Direct integration with Instagram's official API for reliable automation",
            },
            {
              icon: MessageCircle,
              title: "Auto COMMENT Triggers",
              description:
                "Automatically respond to comments with personalized messages",
            },
            {
              icon: Send,
              title: "Automated DM Sender",
              description:
                "Send direct messages with links, media, and custom CTAs",
            },
            {
              icon: Bot,
              title: "Keyword-to-Response Automation",
              description:
                "Set up intelligent rules to respond to specific keywords",
            },
            {
              icon: Target,
              title: "Multi-Post Campaign Assignment",
              description:
                "Manage multiple campaigns across different posts simultaneously",
            },
            {
              icon: Shield,
              title: "Business Account Connection",
              description:
                "Secure token management with automatic refresh capabilities",
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              description:
                "Track engagement logs, clicks, DMs sent, and performance metrics",
            },
            {
              icon: Settings,
              title: "Rule-Based Campaign Manager",
              description:
                "Create sophisticated automation rules for different scenarios",
            },
            {
              icon: Users,
              title: "User Authentication",
              description:
                "JWT-based secure authentication system for team management",
            },
            {
              icon: Webhook,
              title: "Webhooks Setup",
              description:
                "Real-time notifications with failure alerts and monitoring",
            },
            {
              icon: Bell,
              title: "Notifications & Error Logs",
              description:
                "Stay informed with detailed logging and alert systems",
            },
            {
              icon: Target,
              title: "Advanced Link Tracking",
              description:
                "Monitor click-through rates and engagement analytics",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
