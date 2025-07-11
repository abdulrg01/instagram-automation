import { Badge, CheckCircle } from "lucide-react";

export default function CampaignManagerShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Campaign Manager & Analytics
          </h2>
          <p className="text-xl text-gray-600">
            Powerful insights and control at your fingertips
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                Real-time Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Monitor your automation performance with detailed engagement
                logs, click tracking, and DM analytics. Get insights that help
                you optimize your campaigns.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">3.2x</div>
                <div className="text-sm text-gray-600">Engagement Boost</div>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                "Engagement logs and performance tracking",
                "Click-through rate monitoring",
                "DM delivery and response analytics",
                "Error logs with detailed diagnostics",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Campaign Performance</h4>
                <Badge className="bg-green-100 text-green-700">Live</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Auto Replies</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">DMs Sent</span>
                  <span className="font-semibold">1,293</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full w-1/2"></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">98.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
