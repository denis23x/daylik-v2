import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Cookie from '@/components/cookie';
import Sonner from '@/components/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Daylik',
    default: 'Daylik',
  },
  description: 'Daylik is a platform for managing teams and their teammates.',
  openGraph: {
    title: {
      template: '%s | Daylik',
      default: 'Daylik',
    },
  },
  twitter: {
    title: {
      template: '%s | Daylik',
      default: 'Daylik',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Sonner />
          <Cookie />
        </ThemeProvider>
      </body>
    </html>
  );
}
