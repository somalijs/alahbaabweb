import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import 'react-phone-input-2/lib/style.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/Bint';
import Auth from '@/lib/auth/Auth';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await Auth();

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <AuthProvider Auth={auth}>
            <Navbar />
            {children}
          </AuthProvider>
        </AntdRegistry>

        <Toaster />
      </body>
    </html>
  );
}
