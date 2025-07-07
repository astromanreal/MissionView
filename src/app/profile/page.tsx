
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User as UserIcon, Mail, BadgeInfo, ShieldAlert, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile',
  description: 'Manage your MissionView account, view your details, and access account actions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  const { currentUser, isAuthenticated, logout, deleteAccount } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to the login page.
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleDeleteConfirm = async () => {
    const result = await deleteAccount();
    if (result.success) {
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: result.message || "An unexpected error occurred.",
      });
      setIsDeleteDialogOpen(false);
    }
  };


  if (!isAuthenticated || !currentUser) {
    return (
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className="items-center text-center">
                    <ShieldAlert className="w-16 h-16 text-primary mb-4" />
                    <CardTitle>Authentication Required</CardTitle>
                    <CardDescription>
                        Redirecting to login page...
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Please log in to view your profile.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
            <h1 className="text-4xl font-bold text-primary">Your Profile</h1>
            <p className="text-lg text-muted-foreground mt-1">Manage your account information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">
                <Card className="text-center shadow-lg">
                    <CardHeader className="items-center p-6">
                        <Avatar className="w-32 h-32 mb-4 border-4 border-primary/50">
                            <AvatarImage src={`https://api.dicebear.com/8.x/bottts/svg?seed=${currentUser.username}`} alt={currentUser.username} />
                            <AvatarFallback className="text-4xl bg-muted">{getInitials(currentUser.username)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl">{currentUser.username}</CardTitle>
                        <CardDescription>
                            <Badge variant="secondary" className="capitalize text-base mt-2">{currentUser.userType}</Badge>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Account Details</CardTitle>
                        <CardDescription>Your personal information as it appears on MissionView.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="flex items-start">
                            <UserIcon className="w-6 h-6 mr-4 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Username</p>
                                <p className="text-lg font-semibold text-foreground">{currentUser.username}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Mail className="w-6 h-6 mr-4 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                <p className="text-lg font-semibold text-foreground">{currentUser.email}</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <BadgeInfo className="w-6 h-6 mr-4 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                                <p className="text-base font-mono text-muted-foreground break-all">{currentUser.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-destructive/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-destructive flex items-center gap-2">
                           <ShieldAlert className="w-6 h-6"/> Danger Zone
                        </CardTitle>
                         <CardDescription>Irreversible account actions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 rounded-lg bg-muted/50 p-4">
                            <div>
                                <p className="font-semibold text-foreground">Log Out</p>
                                <p className="text-sm text-muted-foreground">End your current session on all devices.</p>
                            </div>
                            <Button onClick={logout} variant="outline" className="w-full sm:w-auto flex-shrink-0">
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 rounded-lg bg-destructive/10 p-4">
                            <div>
                                <p className="font-semibold text-destructive">Delete Account</p>
                                <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                            </div>
                            <Button onClick={() => setIsDeleteDialogOpen(true)} variant="destructive" className="w-full sm:w-auto flex-shrink-0">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
