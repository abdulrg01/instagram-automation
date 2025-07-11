import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CheckCircle, Play, Zap } from "lucide-react";
import React from "react";

export default function Hero() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                <Zap className="w-3 h-3 mr-1" />
                Powered by Instagram Graph API
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Automate Your Instagram.{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Grow Smarter.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Powerful automation using Instagram&apos;s Graph API to boost
                engagement, manage campaigns, and save time. Scale your
                Instagram presence effortlessly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50 px-8 py-3 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-xl shadow-2xl p-6 transform -rotate-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      Campaign Dashboard
                    </h3>
                    <Badge className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        2,847
                      </div>
                      <div className="text-sm text-gray-600">Auto Replies</div>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600">
                        1,293
                      </div>
                      <div className="text-sm text-gray-600">DMs Sent</div>
                    </div>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg flex items-end justify-center">
                    <BarChart3 className="w-12 h-12 text-purple-600 mb-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
