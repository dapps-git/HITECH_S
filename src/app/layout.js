import { Montserrat } from 'next/font/google';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: "Hi Quality Silencers | OEM Specification Silencer Manufacturer & Professional DPF Cleaning",
  description: "ISO Certified OEM specification silencer manufacturer with 15+ years of experience. Professional DPF, DOC, SCR & ASC cleaning services.",
  icons: {
    icon: [
      { url: '/images/logo_hq.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/images/logo_hq.png',
    apple: '/images/logo_hq.png',
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
