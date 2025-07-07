
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft, Calendar, Landmark, Layers3, Rocket, CheckCircle, XCircle, Hourglass, ClipboardList, Target, Clock, Cpu, FlaskConical, Link as LinkIcon, ListChecks, Telescope
} from 'lucide-react';
import { mockMissions, mockAgencies, mockMissionTypes } from '@/lib/mock-data';
import type { Mission } from '@/types/mission';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format, parseISO, isValid } from 'date-fns';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const mission = mockMissions.find(m => m.id === id);

  if (!mission) {
    return {
      title: 'Mission Not Found',
    };
  }

  return {
    title: mission.name,
    description: mission.description,
    openGraph: {
      title: `${mission.name} | MissionView`,
      description: mission.description,
      images: [
        {
          url: mission.imageUrl,
          width: 600,
          height: 400,
          alt: `Artistic representation of ${mission.name}`,
        },
      ],
    },
  };
}

const StatusBadge: React.FC<{ status: Mission['status'] }> = ({ status }) => {
  const variant = {
    Ongoing: 'default',
    Completed: 'secondary',
    Failed: 'destructive',
    Planned: 'outline',
  }[status] as "default" | "secondary" | "destructive" | "outline";
  
  const className = {
    Ongoing: 'bg-yellow-500/80 hover:bg-yellow-500/70 text-yellow-foreground',
    Planned: 'bg-blue-500/80 hover:bg-blue-500/70 text-blue-foreground',
    Completed: 'bg-green-500/80 hover:bg-green-500/70 text-green-foreground',
    Failed: 'bg-red-500/80 hover:bg-red-500/70 text-red-foreground'
  }[status];

  const Icon = {
    Ongoing: Hourglass,
    Completed: CheckCircle,
    Failed: XCircle,
    Planned: ClipboardList
  }[status];

  return (
    <Badge variant={variant} className={`capitalize ${className}`}>
      <Icon className="w-3.5 h-3.5 mr-1.5" />
      {status}
    </Badge>
  );
};

export default function MissionDetailPage({ params }: Props) {
  const id = params.id as string;

  const mission = mockMissions.find(m => m.id === id);
  
  if (!mission) {
    notFound();
  }

  const agency = mockAgencies.find(a => a.id === mission.agencyId);
  const missionType = mockMissionTypes.find(mt => mt.id === mission.missionTypeId);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <Link href="/explore">
          <Button variant="ghost" className="-ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden shadow-2xl border-primary/20">
        <CardHeader className="p-6 sm:p-8 border-b">
            <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-base w-fit">{agency?.name || 'Mission'}</Badge>
                <Badge variant="outline" className="text-base w-fit">{missionType?.name || 'Mission'}</Badge>
              </div>
              <StatusBadge status={mission.status} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                {mission.name}
            </h1>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">{mission.description}</p>
          
          <Separator />
          
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Key Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 text-base">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Launch Date</p>
                    <p className="text-muted-foreground">{isValid(parseISO(mission.launchDate)) ? format(parseISO(mission.launchDate), 'MMMM dd, yyyy') : 'Invalid Date'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Mission Duration</p>
                    <p className="text-muted-foreground">{mission.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Rocket className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Launch Vehicle</p>
                    <p className="text-muted-foreground">{mission.launch_vehicle}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Target</p>
                    <p className="text-muted-foreground">{mission.targetDestination}</p>
                  </div>
                </div>
                 {mission.endDate && isValid(parseISO(mission.endDate)) && (
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">End of Mission</p>
                      <p className="text-muted-foreground">{format(parseISO(mission.endDate), 'MMMM dd, yyyy')}</p>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
          
          <Accordion type="multiple" defaultValue={['objectives', 'spacecraft']} className="w-full">
            {mission.objectives && mission.objectives.length > 0 && (
              <AccordionItem value="objectives">
                <AccordionTrigger className="text-xl text-primary font-semibold"><ListChecks className="mr-3" />Objectives</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
                    {mission.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {mission.spacecraft && (
              <AccordionItem value="spacecraft">
                <AccordionTrigger className="text-xl text-primary font-semibold"><Cpu className="mr-3" />Spacecraft Details</AccordionTrigger>
                <AccordionContent className="pt-2 space-y-4">
                  <p><span className="font-semibold text-foreground">Name:</span> <span className="text-muted-foreground">{mission.spacecraft.name}</span></p>
                  <p><span className="font-semibold text-foreground">Type:</span> <span className="text-muted-foreground">{mission.spacecraft.type}</span></p>
                  {mission.spacecraft.features && mission.spacecraft.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
                        {mission.spacecraft.features.map((feat, i) => <li key={i}>{feat}</li>)}
                      </ul>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )}
            
            {mission.instruments && mission.instruments.length > 0 && (
              <AccordionItem value="instruments">
                <AccordionTrigger className="text-xl text-primary font-semibold"><Telescope className="mr-3" />Instruments</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mission.instruments.map((inst, i) => (
                      <div key={i} className="p-3 rounded-md border bg-card/50">
                        <p className="font-semibold text-foreground">{inst.name}</p>
                        <p className="text-sm text-muted-foreground">{inst.function}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {mission.science_return?.expected_outcomes && mission.science_return.expected_outcomes.length > 0 && (
               <AccordionItem value="science">
                <AccordionTrigger className="text-xl text-primary font-semibold"><FlaskConical className="mr-3" />Science Return</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <h4 className="font-semibold text-foreground mb-2">Expected Outcomes:</h4>
                  <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
                      {mission.science_return.expected_outcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
          
          {(mission.links?.official_site || mission.links?.press_release) && (
            <div className="flex flex-wrap gap-4 pt-4 border-t">
              {mission.links.official_site && (
                <a href={mission.links.official_site} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline"><LinkIcon className="mr-2 h-4 w-4"/>Official Site</Button>
                </a>
              )}
              {mission.links.press_release && (
                <a href={mission.links.press_release} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline"><LinkIcon className="mr-2 h-4 w-4"/>Press Release</Button>
                </a>
              )}
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
