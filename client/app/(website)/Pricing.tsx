import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { plans } from "@/constant/page";
import { Badge, CheckCircle, Shield } from "lucide-react";
import React from "react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a
            14-day free trial.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.price}
              className="border-2 border-purple-500 hover:border-purple-600 transition-all duration-300 relative shadow-xl scale-105"
            >
              {plan.barge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    {plan.barge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.desc}
                </CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${plan.price}
                  </div>
                  <div className="text-gray-600">/{plan.duration}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`${
                    plan.barge
                      ? "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      : "w-full bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {plan.Trial}
                </Button>
                <p className="text-xs text-gray-500 text-center">{plan.card}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Features Comparison */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Compare All Features</h3>
            <p className="text-gray-600">
              See what&apos;s included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold">Features</th>
                  <th className="text-center p-4 font-semibold">Starter</th>
                  <th className="text-center p-4 font-semibold bg-purple-50">
                    Professional
                  </th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Instagram Business Accounts",
                    starter: "1",
                    professional: "3",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Auto-replies per month",
                    starter: "500",
                    professional: "2,000",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "DMs per month",
                    starter: "200",
                    professional: "1,000",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Campaign Rules",
                    starter: "5",
                    professional: "25",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Team Members",
                    starter: "1",
                    professional: "3",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Advanced Analytics",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    feature: "Webhook Integrations",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    feature: "A/B Testing",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    feature: "White-label Options",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                  {
                    feature: "Dedicated Account Manager",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                  {
                    feature: "24/7 Phone Support",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                  {
                    feature: "SLA Guarantee",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                ].map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="p-4 text-center bg-purple-50">
                      {typeof row.professional === "boolean" ? (
                        row.professional ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        row.professional
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Pricing Questions</h3>
            <p className="text-gray-600">
              Common questions about our pricing plans
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change plans anytime?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
              },
              {
                question: "What happens if I exceed my plan limits?",
                answer:
                  "We'll notify you when you're approaching your limits. You can either upgrade your plan or purchase additional usage credits to continue service.",
              },
              {
                question: "Do you offer annual discounts?",
                answer:
                  "Yes! Save 20% when you pay annually. Contact our sales team for custom annual pricing on Enterprise plans.",
              },
              {
                question: "Is there a setup fee?",
                answer:
                  "No setup fees for any plan. We'll help you get started with free onboarding and setup assistance.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-gray-600 mb-6">
              Not satisfied with AutoGram? Get a full refund within 30 days of
              your purchase. No questions asked.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No risk trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Full refund</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
