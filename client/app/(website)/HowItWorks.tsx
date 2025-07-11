import { Instagram, Settings, Zap } from "lucide-react";
import React from "react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">How It Works</h2>
          <p className="text-xl text-gray-600">
            Get started in just 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Connect Account",
              description:
                "Securely connect your Instagram Business account using our Graph API integration",
              icon: Instagram,
            },
            {
              step: "02",
              title: "Set Rules",
              description:
                "Configure automation rules, keywords, and response templates for your campaigns",
              icon: Settings,
            },
            {
              step: "03",
              title: "Automate Campaigns",
              description:
                "Launch your campaigns and watch as engagement grows automatically",
              icon: Zap,
            },
          ].map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-purple-600 shadow-lg">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
