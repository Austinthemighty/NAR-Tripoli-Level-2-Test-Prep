import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "NAR & Tripoli Level 2 Practice Exams | Rocket Cert Prep",
    template: "%s | Rocket Cert Prep",
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  keywords: [
    "NAR Level 2",
    "Tripoli Level 2",
    "L2 certification",
    "high power rocketry",
    "rocketry practice test",
    "TUSC",
    "NFPA 1127",
    "TRA Advanced Certification",
    "rocket cert prep",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "NAR & Tripoli Level 2 Practice Exams",
    description: SITE.defaultDescription,
    images: [{ url: `${SITE.url}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAR & Tripoli Level 2 Practice Exams",
    description: SITE.defaultDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fb3f16",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.defaultDescription,
};

// GitHub Pages cannot send custom response headers, so the security policy
// is delivered via meta tags here as a best-effort substitute. Note: HSTS
// and frame-ancestors/X-Frame-Options cannot be set this way — GitHub Pages
// already enforces HTTPS for the custom domain, and the site embeds no
// third-party content.
const CSP =
  "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; " +
  "script-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self'; " +
  "base-uri 'self'; form-action 'self'";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={orgLd} />
        <Nav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
