import { Montserrat } from 'next/font/google';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://hiquality.info'),
  title: "Hi Quality Silencers | OEM Specification Silencer Manufacturer & Professional DPF Cleaning",
  description: "ISO Certified OEM specification silencer manufacturer with 15+ years of experience. Professional DPF, DOC, SCR & ASC cleaning services.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Hi Quality Silencers | OEM Specification Silencer Manufacturer & Professional DPF Cleaning Experts",
    description: "ISO Certified OEM specification silencer manufacturer with 15+ years of experience. Professional DPF, DOC, SCR & ASC cleaning services.",
    url: "https://hiquality.info",
    siteName: "Hi Quality Silencers",
    images: [
      {
        url: "/images/social_preview.png",
        width: 1200,
        height: 630,
        alt: "Hi Quality Silencers Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hi Quality Silencers | OEM Specification Silencer Manufacturer & Professional DPF Cleaning",
    description: "ISO Certified OEM specification silencer manufacturer & professional DPF cleaning.",
    images: ["/images/social_preview.png"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
