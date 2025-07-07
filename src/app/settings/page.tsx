
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Construction, Palette, BellRing } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-10 h-10 text-primary mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-muted-foreground">Customize your MissionView experience.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5" />Appearance</CardTitle>
            <CardDescription>Adjust visual settings for the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode-switch" className="text-base">
                Dark Mode
              </Label>
              <Switch id="dark-mode-switch" checked={true} disabled aria-readonly /> 
            </div>
            <p className="text-xs text-muted-foreground">
              Currently, dark mode is enabled by default. Theme switching coming soon!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BellRing className="mr-2 h-5 w-5" />Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-mission-notifs" className="text-base">
                New Mission Alerts
              </Label>
              <Switch id="new-mission-notifs" disabled />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="event-updates-notifs" className="text-base">
                Mission Event Updates
              </Label>
              <Switch id="event-updates-notifs" disabled />
            </div>
             <p className="text-xs text-muted-foreground">
              Notification settings are under construction.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700/50 col-span-full md:col-span-1">
            <CardHeader className="flex flex-row items-center space-x-4">
            <Construction className="w-10 h-10 text-amber-500 dark:text-amber-400" />
            <div>
                <CardTitle className="text-amber-700 dark:text-amber-300">More Settings Coming Soon!</CardTitle>
                <CardDescription className="text-amber-600 dark:text-amber-400">
                This page is under active development.
                </CardDescription>
            </div>
            </CardHeader>
        </Card>
      </div>
    </div>
  );
}
