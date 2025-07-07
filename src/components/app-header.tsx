
'use client';

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {
  return (
    <header className="py-4 sm:py-6 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-md z-40"> {/* z-index adjusted for sidebar */}
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <SidebarTrigger className="md:hidden" /> {/* Hidden on md and up if sidebar is shown */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3" aria-label="MissionView Home">
            <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">MissionView</h1>
          </Link>
        </div>
        {/* Navigation items and admin toggle are now in the sidebar */}
      </div>
    </header>
  );
}
