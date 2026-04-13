import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NxN Training',
  description: 'Premium interactive training for Salesforce business processes',
  icons: {
    icon: '/logos/7x_Logo_Reverse.svg',
    apple: '/logos/7x_Logo_Reverse.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Cairo:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-4 md:pt-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
