import Image from "next/image";
import Link from "next/link";

export default function BlogPostsWithRealImages() {
  return (
    <div className="container bg-white mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-gray-500 font-medium mb-2">Blog Posts</h2>
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-6xl font-bold text-[#000080]">
            Latest News & Insights
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#035e85]"></div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Post 1 */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <div className="relative h-64 w-full">
            <Image
              src="/kainuwa/kainuwa8.jpg"
              alt="Gas cylinders"
              fill
              className="object-cover hover:scale-115 transition-all ease-in-out duration-700"
            />
            {/* Date Badge */}
            <div className="absolute top-4 left-4 flex">
              <div className="bg-[#035e85] text-white font-bold text-xl py-1 px-3">
                27
              </div>
              <div className="bg-gray-800 text-white font-bold text-xl py-1 px-3">
                SEP
              </div>
            </div>
          </div>
          <div className="p-6 bg-white">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 rounded-full bg-[#035e85] text-white flex items-center justify-center mr-2">
                <span className="text-xs">A</span>
              </div>
              <span className="text-gray-600">by Admin</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              <Link href="#" className="text-gray-900 hover:text-blue-900">
                Nigeria Achieves Significant Milestone with 1 Million Metric
                Tonnes of Cooking Gas Consumption
              </Link>
            </h3>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <div className="relative h-64 w-full">
            <Image
              src="/kainuwa/kainuwa8.jpg"
              alt="NNPC GMD"
              fill
              className="object-cover hover:scale-115 transition-all ease-in-out duration-700"
            />
            {/* Date Badge */}
            <div className="absolute top-4 left-4 flex">
              <div className="bg-[#035e85] text-white font-bold text-xl py-1 px-3">
                15
              </div>
              <div className="bg-gray-800 text-white font-bold text-xl py-1 px-3">
                AUG
              </div>
            </div>
          </div>
          <div className="p-6 bg-white">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 rounded-full bg-[#035e85] text-white flex items-center justify-center mr-2">
                <span className="text-xs">A</span>
              </div>
              <span className="text-gray-600">by Admin</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              <Link href="#" className="text-gray-900 hover:text-blue-900">
                Exploring the Ongoing Medicine Price Surge: A Global Perspective
                on Supply and Demand Dynamics
              </Link>
            </h3>
          </div>
        </div>

        {/* Blog Post 3 */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <div className="relative h-64 w-full">
            <Image
              src="/kainuwa/kainuwa8.jpg"
              alt="Medicine terminal"
              fill
              className="object-cover hover:scale-115 transition-all ease-in-out duration-700"
            />
            {/* Date Badge */}
            <div className="absolute top-4 left-4 flex">
              <div className="bg-[#035e85] text-white font-bold text-xl py-1 px-3">
                7
              </div>
              <div className="bg-gray-800 text-white font-bold text-xl py-1 px-3">
                JUL
              </div>
            </div>
          </div>
          <div className="p-6 bg-white">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 rounded-full bg-[#035e85] text-white flex items-center justify-center mr-2">
                <span className="text-xs">A</span>
              </div>
              <span className="text-gray-600">by Admin</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              <Link href="#" className="text-gray-900 hover:text-blue-900">
                Anticipating a Global Medicine Demand Supply Shortage in Late
                2021.
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
