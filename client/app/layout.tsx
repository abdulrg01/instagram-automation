import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/lib/redux/providers";
import { AuthProvider } from "@/components/auth-provider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoGram",
  description: "Automate DMs and Comments on Instagram",
  icons: {
    icon: "/assets/images/instagram.jpeg",
    shortcut: "/assets/images/instagram.jpeg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Insta real",
    description: "Automate DMs and Comments on Instagram",
    url: "https://insta-automation-git-main-abdulrg01s-projects.vercel.app",
    siteName: "Insta real",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insta real",
    description: "Automate DMs and Comments on Instagram",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    title: "Insta real",
    statusBarStyle: "black-translucent",
    capable: true,
    startupImage: [
      "/apple-touch-startup-image.png",
      "/apple-touch-startup-image-2x.png",
    ],
  },
  // manifest: "/manifest.json",
  // themeColor: "#000000",
  // viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://instareal.ai",
    languages: {
      "en-US": "/en",
      "es-ES": "/es",
      "fr-FR": "/fr",
      "de-DE": "/de",
    },
  },
  // verification: {
  //   google: "google-site-verification=your-google-site-verification-code",
  //   yandex: "yandex-verification: your-yandex-verification-code",
  //   other: [
  //     {
  //       name: "Bing",
  //       url: "https://www.bing.com/webmasters/verification/verification.ashx?siteMap=https://instareal.ai/sitemap.xml",
  //     },
  //   ],
  // },
  keywords: [
    "Instagram automation",
    "DM",
    "comment automation",
    "Instagram growth",
    "social media marketing",
    "Instagram tools",
    "Instagram engagement",
    "Instagram management",
    "Instagram analytics",
  ],
  authors: [
    {
      name: "Insta real Team",
      url: "https://insta-automation-git-main-abdulrg01s-projects.vercel.app",
    },
  ],
  creator: "Insta real Team",
  publisher: "Insta real Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={jakarta.className}>
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
