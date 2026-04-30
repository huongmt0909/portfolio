import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hướng MT. | Frontend Developer',
  description:
    'Hướng MT. — Frontend Developer chuyên ReactJS và Flutter. 3+ năm kinh nghiệm xây dựng giao diện đẹp, hiệu suất cao.',
  authors: [{ name: 'Hướng MT.' }],
  keywords: ['Frontend Developer', 'ReactJS', 'Flutter', 'TypeScript', 'Mobile Developer', 'Vietnam'],
  openGraph: {
    title: 'Hướng MT. | Frontend Developer',
    description: 'Hướng MT. — Frontend Developer chuyên ReactJS và Flutter.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary',
    title: 'Hướng MT. | Frontend Developer',
    description: 'Hướng MT. — Frontend Developer chuyên ReactJS và Flutter.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%236366f1'/><text x='16' y='23' font-size='18' font-weight='900' text-anchor='middle' fill='white' font-family='system-ui'>H</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
