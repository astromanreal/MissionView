
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Rocket, Telescope, Compass, Mail, Settings as SettingsIcon, CalendarClock, MapPin, Package, Info, BarChart3, Users, ListChecks } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { mockMissions } from '@/lib/mock-data';


export default function HomePage() {
  const upcomingLaunch = useMemo(() => {
    const plannedMissions = mockMissions
      .filter(m => m.status === 'Planned' && new Date(m.launchDate) > new Date())
      .sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime());
    return plannedMissions.length > 0 ? plannedMissions[0] : null;
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 shadow-2xl mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25" 
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/54/f1/24/54f1242cebf268f12b5a5f74107746aa.jpg')" }}
          data-ai-hint="galaxy stars"
        ></div>
        <div className="relative z-10 px-4">
          <Rocket className="w-20 h-20 md:w-24 md:h-24 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 mb-6">
            MissionView
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Your ultimate portal to explore the vastness of space missions, past, present, and future. Dive into detailed data, track events, and discover the universe.
          </p>
          
          <div className="my-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-slate-200">
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <p className="text-3xl md:text-4xl font-bold text-primary">{mockMissions.length}+</p>
              <p className="text-xs sm:text-sm text-slate-400">Missions Cataloged</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-xs sm:text-sm text-slate-400">Agencies Worldwide</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm col-span-2 sm:col-span-1">
              <p className="text-3xl md:text-4xl font-bold text-primary">10k+</p>
              <p className="text-xs sm:text-sm text-slate-400">Events Tracked</p>
            </div>
          </div>

          <Link href="/explore">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Compass className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" /> Explore Missions
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Upcoming Launch Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-primary mb-4">Featured Upcoming Launch</h2>
        <p className="text-lg text-muted-foreground text-center mb-10">Don't miss this historic event!</p>
        {upcomingLaunch ? (
            <Card className="max-w-4xl mx-auto shadow-xl overflow-hidden border-primary/30 bg-card hover:shadow-primary/40 transition-shadow duration-300">
            <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-2/5">
                <Image 
                    src={upcomingLaunch.imageUrl || "https://placehold.co/600x400.png"}
                    alt={`Artistic representation of ${upcomingLaunch.name}`}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                    data-ai-hint="rocket launch"
                />
                </div>
                <div className="p-6 md:p-8 flex-grow">
                <CardHeader className="p-0 mb-4">
                    <div className="flex justify-between items-start">
                    <CardTitle className="text-3xl font-bold text-primary">{upcomingLaunch.name}</CardTitle>
                    <Badge variant="outline" className="text-sm border-primary text-primary">{upcomingLaunch.status}</Badge>
                    </div>
                    <CardDescription className="text-lg text-muted-foreground mt-1">
                    Powered by {upcomingLaunch.launch_vehicle}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    <p className="text-foreground/90 text-base">{upcomingLaunch.description}</p>
                    
                    <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                        <CalendarClock className="w-5 h-5 mr-3 text-primary shrink-0" />
                        <div>
                        <span className="font-semibold text-foreground">Launch Date:</span>
                        <span className="text-muted-foreground ml-1">{new Date(upcomingLaunch.launchDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-primary shrink-0" />
                        <div>
                        <span className="font-semibold text-foreground">Target:</span>
                        <span className="text-muted-foreground ml-1">{upcomingLaunch.targetDestination}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Package className="w-5 h-5 mr-3 text-primary shrink-0" />
                        <div>
                        <span className="font-semibold text-foreground">Spacecraft:</span>
                        <span className="text-muted-foreground ml-1">{upcomingLaunch.spacecraft.name}</span>
                        </div>
                    </div>
                    {upcomingLaunch.objectives.length > 0 && (
                        <div className="flex items-start">
                            <ListChecks className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                            <div>
                            <span className="font-semibold text-foreground">Primary Objective:</span>
                            <span className="text-muted-foreground ml-1">{upcomingLaunch.objectives[0]}</span>
                            </div>
                        </div>
                    )}
                    </div>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                    <Link href={`/missions/${upcomingLaunch.id}`} passHref>
                    <Button variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary/10">
                        <Telescope className="mr-2 h-5 w-5" /> View Full Mission Details
                    </Button>
                    </Link>
                </CardFooter>
                </div>
            </div>
            </Card>
        ) : (
             <Card className="max-w-4xl mx-auto text-center p-8">
                <CardTitle>No upcoming launches scheduled.</CardTitle>
                <CardDescription>Check back later for new mission announcements or explore past missions.</CardDescription>
            </Card>
        )}
      </section>


      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-primary mb-12">What MissionView Offers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-primary/20 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <ListChecks className="w-8 h-8 mr-3 text-primary" />
                Comprehensive Mission Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dive deep into details of countless space missions. Discover launch dates, objectives, destinations, and key events from various agencies.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-primary/20 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <BarChart3 className="w-8 h-8 mr-3 text-primary" />
                Advanced Exploration Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Filter, search, and sort missions with ease. Visualize data with interactive charts and explore events on a dynamic timeline.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-primary/20 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="w-8 h-8 mr-3 text-primary" />
                Community & Admin Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Engage with a user profile, manage mission data via the Admin Panel, and explore educational resources and insights.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="text-center py-16 bg-card rounded-xl shadow-lg">
          <Image src="https://i.pinimg.com/736x/59/ec/4d/59ec4d26665f7c4396793cb6400fa9a0.jpg" alt="Earth from Space" width={1200} height={400} className="w-full h-64 object-cover rounded-t-xl opacity-80" data-ai-hint="earth space" />
          <div className="p-8">
              <h2 className="text-3xl font-semibold text-primary mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  The universe is waiting. Click below to begin your exploration of humanity's greatest adventures beyond Earth.
              </p>
              <Link href="/explore">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-6 rounded-lg border-primary text-primary hover:bg-primary/10 transform hover:scale-105 transition-transform">
                       Embark on Exploration
                  </Button>
              </Link>
          </div>
      </section>

    </div>
  );
}
