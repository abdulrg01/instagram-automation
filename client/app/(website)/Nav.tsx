"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Nav() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AutoGram
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Pricing
          </a>
          {user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" cursor-pointer"
            >
              <Button
                variant="default"
                size="sm"
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-3 text-lg"
                asChild
                onClick={() => router.push(`/dashboard/${user.name}`)}
              >
                <span className="cursor-pointer">Dashboard</span>
              </Button>
            </motion.div>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/auth/sign-in")}
              className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
