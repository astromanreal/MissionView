
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppNavigation } from '@/components/app-navigation';
import { 
  SidebarProvider, 
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AuthProvider } from '@/hooks/useAuth';
import { AppHeader } from '@/components/app-header';

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
    default: 'MissionView - Explore Space Missions',
    template: '%s | MissionView',
  },
  description: 'Your ultimate portal to explore the vastness of space missions. Track past, present, and future missions from NASA, ESA, SpaceX, and more. Dive into detailed data, timelines, and insights.',
  keywords: ['space missions', 'NASA', 'SpaceX', 'ESA', 'rocket launch', 'space exploration', 'Artemis', 'JWST', 'Mars Rover'],
  openGraph: {
    title: 'MissionView - Explore Space Missions',
    description: 'Your ultimate portal to explore the vastness of space missions.',
    url: 'https://missionview.app', // Assuming a domain
    siteName: 'MissionView',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <AuthProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar side="left" collapsible="icon" className="border-r border-border/50">
                <AppNavigation />
              </Sidebar>
              <SidebarInset className="flex-1 flex flex-col">
                <AppHeader />
                <main className="flex-grow">
                  {children}
                </main>
                <footer className="py-6 border-t border-border/50">
                  <div className="container mx-auto text-center text-muted-foreground text-sm">
                    &copy; {new Date().getFullYear()} MissionView. All rights reserved.
                  </div>
                </footer>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
