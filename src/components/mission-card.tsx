import Image from 'next/image';
import type { Mission, Agency, MissionType } from '@/types/mission';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Target, Layers, Landmark, Globe, Rocket as AgencyRocketIcon, Orbit, Satellite, Users, Telescope, ArrowUpCircle, Edit, Trash2, ArrowRight } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import Link from 'next/link';

interface MissionCardProps {
  mission: Mission;
  agency?: Agency; 
  missionType?: MissionType; 
  onEdit: (mission: Mission) => void;
  onDelete: (missionId: string) => void;
  canManage: boolean;
}

const getAgencyIcon = (agencyName?: string) => {
  if (!agencyName) return <Landmark className="w-4 h-4 mr-1" />;
  const lowerAgency = agencyName.toLowerCase();
  if (lowerAgency.includes('nasa')) return <Landmark className="w-4 h-4 mr-1" />;
  if (lowerAgency.includes('esa')) return <Globe className="w-4 h-4 mr-1" />;
  if (lowerAgency.includes('spacex')) return <AgencyRocketIcon className="w-4 h-4 mr-1" />;
  return <Landmark className="w-4 h-4 mr-1" />;
};


const getMissionTypeIcon = (typeName?: string) => {
  if (!typeName) return <Layers className="w-4 h-4 mr-1" />;
  switch (typeName.toLowerCase()) {
    case 'planetary science': return <Orbit className="w-4 h-4 mr-1" />;
    case 'earth observation': return <Satellite className="w-4 h-4 mr-1" />;
    case 'human spaceflight': return <Users className="w-4 h-4 mr-1" />;
    case 'deep space exploration': return <Telescope className="w-4 h-4 mr-1" />;
    case 'satellite launch': return <ArrowUpCircle className="w-4 h-4 mr-1" />;
    case 'launch vehicle test': return <AgencyRocketIcon className="w-4 h-4 mr-1" />;
    default: return <Layers className="w-4 h-4 mr-1" />;
  }
};

export function MissionCard({ mission, agency, missionType, onEdit, onDelete, canManage }: MissionCardProps) {
  const agencyName = agency?.name || 'Unknown Agency';
  const missionTypeName = missionType?.name || 'Unknown Type';
  
  const formattedLaunchDate = isValid(parseISO(mission.launchDate)) 
    ? format(parseISO(mission.launchDate), 'MMM dd, yyyy') 
    : 'Invalid Date';
  
  const formattedEndDate = mission.endDate && isValid(parseISO(mission.endDate)) 
    ? format(parseISO(mission.endDate), 'MMM dd, yyyy') 
    : null;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:shadow-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl pr-4">{mission.name}</CardTitle>
          {canManage && (
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="icon" onClick={() => onEdit(mission)} aria-label={`Edit ${mission.name}`}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => onDelete(mission.id)} aria-label={`Delete ${mission.name}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <CardDescription className="line-clamp-3 h-[3.75rem] pt-1">{mission.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center text-muted-foreground">
          {getAgencyIcon(agencyName)}
          Agency: <span className="ml-1 font-medium text-foreground">{agencyName}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          {getMissionTypeIcon(missionTypeName)}
          Type: <span className="ml-1 font-medium text-foreground">{missionTypeName}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <CalendarDays className="w-4 h-4 mr-1" />
          Launch: <span className="ml-1 font-medium text-foreground">{formattedLaunchDate}</span>
        </div>
        {formattedEndDate && (
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-1" />
            End: <span className="ml-1 font-medium text-foreground">{formattedEndDate}</span>
          </div>
        )}
        <div className="flex items-center text-muted-foreground">
          <Target className="w-4 h-4 mr-1" />
          Target: <span className="ml-1 font-medium text-foreground">{mission.targetDestination}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant={mission.status === 'Ongoing' ? 'default' : mission.status === 'Completed' ? 'secondary' : mission.status === 'Failed' ? 'destructive' : 'outline'}
               className={`${mission.status === 'Ongoing' ? 'bg-primary/80 text-primary-foreground' : ''} ${mission.status === 'Planned' ? 'border-blue-500 text-blue-500' : ''}`}
        >
          {mission.status}
        </Badge>
        <Link href={`/missions/${mission.id}`} passHref>
          <Button variant="outline" size="sm">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
