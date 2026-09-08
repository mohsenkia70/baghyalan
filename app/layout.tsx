import type { Metadata, Viewport } from "next";
import { PwaManager } from "@/components/system/PwaManager";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "عمارت یلان | باغ عمارت لوکس مراسم و عروسی",
    template: "%s | عمارت یلان",
  },
  description:
    "پلتفرم دیجیتال عمارت یلان — کشف فضا، برنامه‌ریزی مراسم، رزرو بازدید و پیگیری کامل مراسم عروسی و عقد شما در گرمدره، البرز.",
  applicationName: "عمارت یلان",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "عمارت یلان",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1E3B2E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full min-h-full bg-ivory text-ink antialiased">
        <PwaManager />
        {children}
      </body>
    </html>
  );
}
