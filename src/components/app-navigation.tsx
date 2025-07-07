
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Compass, UserCircle, LayoutDashboard, Settings as SettingsIcon, Mail,
  ShieldCheck, ShieldOff, Rocket, Home, Newspaper, LogOut, LogIn, Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarNavLink = ({ href, icon: Icon, label, exact = false }: { href: string; icon: React.ElementType; label: string; exact?: boolean; }) => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive = exact ? pathname === href : (href === "/" ? pathname === href : pathname.startsWith(href) && href !== "/");

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenuItem>
      <Link href={href} passHref legacyBehavior>
        <SidebarMenuButton 
          isActive={isActive} 
          tooltip={label} 
          className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
          onClick={handleClick}
        >
          <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
          <span className="text-sm">{label}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

export function AppNavigation() {
  const { isAuthenticated, currentUser, isSuperUserAdmin, isAdmin, isScientist, toggleAdminMode, logout } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    if(isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <>
      <SidebarHeader className="p-2 flex items-center justify-between group-data-[collapsible=icon]:justify-center">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden" aria-label="MissionView Home">
          <Rocket className="w-7 h-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-sidebar-foreground">MissionView</h1>
        </Link>
        <SidebarTrigger className="hidden md:flex group-data-[collapsible=icon]:mx-auto" />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="flex-1 overflow-y-auto p-2">
        <SidebarMenu>
          <SidebarNavLink href="/" icon={Home} label="Home" exact={true} />
          <SidebarNavLink href="/explore" icon={Compass} label="Explore" />
          <SidebarNavLink href="/missions" icon={Layers} label="Mission Gallery" />
          <SidebarNavLink href="/blog" icon={Newspaper} label="Blog & Resources" />
          
          {isAuthenticated ? (
             <SidebarNavLink href="/profile" icon={UserCircle} label="Profile" />
          ) : (
             <SidebarNavLink href="/login" icon={LogIn} label="Login / Sign Up" />
          )}
          
          {(isAdmin || isScientist) && (
            <SidebarNavLink href="/admin" icon={LayoutDashboard} label="Admin Panel" />
          )}
          
          <SidebarNavLink href="/settings" icon={SettingsIcon} label="Settings" />
          <SidebarNavLink href="/contact" icon={Mail} label="Contact" />
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-2 space-y-2">
        {isAuthenticated && currentUser && (
           <div className="px-2 group-data-[collapsible=icon]:hidden">
             <p className="text-sm font-semibold truncate text-sidebar-foreground" title={currentUser.username}>{currentUser.username}</p>
             <p className="text-xs text-muted-foreground capitalize" title={currentUser.email}>{currentUser.userType}</p>
           </div>
        )}
        <SidebarMenu>
          {isAdmin && (
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleAdminMode}
                tooltip={isSuperUserAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
                aria-label={isSuperUserAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
                className={cn(
                  "w-full",
                  isSuperUserAdmin && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                {isSuperUserAdmin ? <ShieldCheck className="h-5 w-5 text-green-500" /> : <ShieldOff className="h-5 w-5 text-red-500" />}
                <span className="text-sm">{isSuperUserAdmin ? "Admin Mode: ON" : "Admin Mode: OFF"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {isAuthenticated && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="w-full">
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
