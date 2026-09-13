import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Food Processor Customer Management System',
  description: 'HubSpot-inspired CRM for food processors featuring dedicated 3-column contact and company record detail pages, Breeze AI summaries, activity timelines, pipeline board, and single-file HTML export.',
  openGraph: {
    title: 'Food Processor Customer Management System',
    description: 'HubSpot-inspired CRM for food processors featuring dedicated 3-column contact and company record detail pages, Breeze AI summaries, activity timelines, pipeline board, and single-file HTML export.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Processor Customer Management System',
    description: 'HubSpot-inspired CRM for food processors featuring dedicated 3-column contact and company record detail pages, Breeze AI summaries, activity timelines, pipeline board, and single-file HTML export.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
