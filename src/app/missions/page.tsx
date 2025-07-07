
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Eye, Calendar, Landmark, Layers as LayersIcon, Rocket, Clock } from 'lucide-react';
import { mockMissions, mockAgencies, mockMissionTypes } from '@/lib/mock-data';
import type { Mission } from '@/types/mission';
import { format, parseISO, isValid } from 'date-fns';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mission Gallery',
  description: 'Browse through a curated gallery of significant space missions, one by one. Get a snapshot of each mission\'s key details.',
};

export default function MissionsGalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mockMissions.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mockMissions.length - 1 ? 0 : prevIndex + 1));
  };
  
  const currentMission = useMemo(() => {
    return mockMissions.length > 0 ? mockMissions[currentIndex] : null;
  }, [currentIndex]);


  const getAgencyNameById = (id: string) => mockAgencies.find(a => a.id === id)?.name || 'Unknown Agency';
  const getMissionTypeNameById = (id: string) => mockMissionTypes.find(mt => mt.id === id)?.name || 'Unknown Type';

  if (!currentMission) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
         <div className="flex items-center mb-8 self-start">
            <LayersIcon className="w-10 h-10 text-primary mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-primary">Mission Gallery</h1>
              <p className="text-muted-foreground">Browse missions one by one.</p>
            </div>
        </div>
        <Card className="w-full max-w-3xl shadow-lg p-8">
            <div className="flex flex-col items-center justify-center text-center h-64">
                <Rocket className="w-16 h-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold text-foreground">No Missions Found</h2>
                <p className="text-muted-foreground mt-2">There are currently no missions to display in the gallery.</p>
            </div>
        </Card>
      </div>
    );
  }
  
  const agencyName = getAgencyNameById(currentMission.agencyId);
  const missionTypeName = getMissionTypeNameById(currentMission.missionTypeId);

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
        <div className="flex items-center mb-8 self-start w-full max-w-3xl">
            <LayersIcon className="w-10 h-10 text-primary mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-primary">Mission Gallery</h1>
              <p className="text-muted-foreground">Browse missions one by one.</p>
            </div>
        </div>
        
        <Card className="w-full max-w-3xl shadow-2xl border-primary/20">
           <CardHeader>
               <div className="flex justify-between items-start">
                    <CardTitle className="text-3xl font-bold text-primary">{currentMission.name}</CardTitle>
                    <Badge variant={currentMission.status === 'Ongoing' ? 'default' : currentMission.status === 'Completed' ? 'secondary' : currentMission.status === 'Failed' ? 'destructive' : 'outline'}
                        className={`capitalize text-sm ${currentMission.status === 'Ongoing' ? 'bg-yellow-500/80 hover:bg-yellow-500/70 text-yellow-foreground' : ''} ${currentMission.status === 'Planned' ? 'bg-blue-500/80 hover:bg-blue-500/70 text-blue-foreground' : ''} ${currentMission.status === 'Completed' ? 'bg-green-500/80 hover:bg-green-500/70 text-green-foreground' : ''} ${currentMission.status === 'Failed' ? 'bg-red-500/80 hover:bg-red-500/70 text-red-foreground' : ''} font-semibold`}>
                        {currentMission.status}
                    </Badge>
               </div>
           </CardHeader>
           <CardContent className="p-6 pt-0 space-y-6">
            <CardDescription className="text-base text-foreground/90 leading-relaxed">{currentMission.description}</CardDescription>
            
            <div className="pt-4 border-t">
                 <h3 className="text-lg font-semibold text-foreground mb-4">Mission Details</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div className="flex items-start">
                        <Landmark className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-foreground">Agency</p>
                            <p className="text-muted-foreground">{agencyName}</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <LayersIcon className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-foreground">Mission Type</p>
                            <p className="text-muted-foreground">{missionTypeName}</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Calendar className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-foreground">Launch Date</p>
                            <p className="text-muted-foreground">{isValid(parseISO(currentMission.launchDate)) ? format(parseISO(currentMission.launchDate), 'MMMM dd, yyyy') : 'Invalid Date'}</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <Eye className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-foreground">Destination</p>
                            <p className="text-muted-foreground">{currentMission.targetDestination}</p>
                        </div>
                    </div>
                    {currentMission.endDate && isValid(parseISO(currentMission.endDate)) && (
                      <div className="flex items-start">
                          <Clock className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                          <div>
                              <p className="font-semibold text-foreground">End of Mission</p>
                              <p className="text-muted-foreground">{format(parseISO(currentMission.endDate), 'MMMM dd, yyyy')}</p>
                          </div>
                      </div>
                    )}
                </div>
            </div>
           </CardContent>
           <CardFooter className="p-6 pt-2">
              <Link href={`/missions/${currentMission.id}`} passHref className="w-full">
                <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
           </CardFooter>
        </Card>
        
        <div className="flex items-center justify-between gap-4 mt-8 w-full max-w-3xl">
          <Button onClick={handlePrevious} variant="outline" size="lg" className="flex-1">
            <ArrowLeft className="mr-2 h-5 w-5" /> Previous
          </Button>
          
          <p className="text-muted-foreground text-center tabular-nums">
             {currentIndex + 1} / {mockMissions.length}
          </p>
          
          <Button onClick={handleNext} variant="outline" size="lg" className="flex-1">
            Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

      </div>
    </>
  );
}
