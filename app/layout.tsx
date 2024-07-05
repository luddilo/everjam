"use client";

import "./global.css";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import backgroundDesktop from "./assets/bg-desktop.jpg";
import backgroundMobile from "./assets/bg-mobile-2.jpg";
import { useIsMobile } from "./hooks/useMediaQuery";

// export const metadata: any = {
//   metadataBase: new URL(baseUrl),
//   title: {
//     default: "Everjam",
//     template: "Everjam in %s",
//   },
//   description: "Some of the things I do.",
//   openGraph: {
//     title: "Everjam",
//     description: "An always open Contact improvisation studio",
//     url: baseUrl,
//     siteName: "Everjam",
//     locale: "en_US",
//     type: "website",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mobile = useIsMobile();
  console.log(mobile);

  return (
    <html
      lang="en"
      style={{
        backgroundImage: mobile
          ? `url(${backgroundMobile.src})`
          : `url(${backgroundDesktop.src})`,
        backgroundSize: "cover",
      }}
      className="dark"
    >
      <body className="antialiased max-w-full mx-auto w-auto mt-8 mx-auto text-black bg-white/80 dark:text-white dark:bg-black/80">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 lg:px-4 pb-4">
          <Navbar />
          {children}
          {/* <Footer /> */}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
