
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Mission, AddMissionFormData, Agency, MissionType } from '@/types/mission';
import { mockMissions, mockAgencies, mockMissionTypes } from '@/lib/mock-data';
import { MissionCard } from '@/components/mission-card';
import { MissionFilters } from '@/components/mission-filters';
import { AddMissionDialog } from '@/components/add-mission-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, PlusCircle, Info, FilterX, Compass, Building, Activity, CalendarDays, Layers } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart as RechartsPieChart, Pie, Cell as RechartsCell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format, parseISO, isValid } from 'date-fns';

const MISSIONS_STORAGE_KEY = 'missions_data';

const CHART_COLORS_HSL = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-1) / 0.7)",
  "hsl(var(--chart-2) / 0.7)",
  "hsl(var(--chart-3) / 0.7)",
];

const initialFilters = {
  year: null,
  typeId: null,
  agencyId: null,
  status: null,
  destination: null,
  minDurationDays: null,
  maxDurationDays: null,
};

export function ExploreClient() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [missionTypes, setMissionTypes] = useState<MissionType[]>([]);

  const [filters, setFilters] = useState<{ 
    year: string | null; 
    typeId: string | null; 
    agencyId: string | null;
    status: Mission['status'] | null;
    destination: string | null;
    minDurationDays: number | null;
    maxDurationDays: number | null;
  }>(initialFilters);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [missionToDeleteId, setMissionToDeleteId] = useState<string | null>(null);

  const { toast } = useToast();
  const { isSuperUserAdmin } = useAuth();

  useEffect(() => {
    try {
      const storedMissions = localStorage.getItem(MISSIONS_STORAGE_KEY);
      if (storedMissions) {
        setMissions(JSON.parse(storedMissions));
      } else {
        setMissions(mockMissions);
        localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(mockMissions));
      }
    } catch (error) {
      console.error("Could not parse missions from localStorage", error);
      setMissions(mockMissions);
    }
    
    setAgencies(JSON.parse(JSON.stringify(mockAgencies)));
    setMissionTypes(JSON.parse(JSON.stringify(mockMissionTypes)));
  }, []);

  const saveMissionsToStorage = (updatedMissions: Mission[]) => {
    localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(updatedMissions));
    setMissions(updatedMissions);
  };

  const uniqueYears = useMemo(() => {
    const years = new Set(missions.map(m => {
      const date = parseISO(m.launchDate);
      return isValid(date) ? date.getFullYear() : null;
    }).filter(year => year !== null) as number[]);
    return Array.from(years).sort((a, b) => b - a);
  }, [missions]);
  
  const uniqueDestinations = useMemo(() => {
    const destinations = new Set(missions.map(m => m.targetDestination));
    return Array.from(destinations).sort();
  }, [missions]);

  const getAgencyNameById = useCallback((id: string) => agencies.find(a => a.id === id)?.name || 'Unknown Agency', [agencies]);
  const getMissionTypeNameById = useCallback((id: string) => missionTypes.find(mt => mt.id === id)?.name || 'Unknown Type', [missionTypes]);

  const filteredMissions = useMemo(() => {
    return missions.filter(mission => {
      const launchDate = parseISO(mission.launchDate);
      const launchYear = isValid(launchDate) ? launchDate.getFullYear().toString() : null;
      
      const endDate = mission.endDate ? parseISO(mission.endDate) : null;
      const missionDurationDays = isValid(launchDate) && isValid(endDate) 
        ? Math.round((endDate.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24)) 
        : null;

      const matchesYear = !filters.year || (launchYear === filters.year);
      const matchesType = !filters.typeId || mission.missionTypeId === filters.typeId;
      const matchesAgency = !filters.agencyId || mission.agencyId === filters.agencyId;
      const matchesStatus = !filters.status || mission.status === filters.status;
      const matchesDestination = !filters.destination || mission.targetDestination === filters.destination;
      const matchesMinDuration = filters.minDurationDays === null || (missionDurationDays !== null && missionDurationDays >= filters.minDurationDays);
      const matchesMaxDuration = filters.maxDurationDays === null || (missionDurationDays !== null && missionDurationDays <= filters.maxDurationDays);
      
      const agencyName = getAgencyNameById(mission.agencyId);
      const missionTypeName = getMissionTypeNameById(mission.missionTypeId);

      let matchesSearch = true;
      if (searchTerm.trim()) {
        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(kw => kw.length > 0);
        const missionSearchableText = [
          mission.name,
          mission.description,
          mission.targetDestination,
          agencyName,
          missionTypeName,
          String(launchYear),
          mission.status,
          ...(mission.events?.map(e => `${e.title} ${e.description}`) || [])
        ].join(' ').toLowerCase();

        matchesSearch = searchKeywords.every(keyword => missionSearchableText.includes(keyword));
      }
      
      return matchesYear && matchesType && matchesAgency && matchesStatus && matchesDestination && matchesMinDuration && matchesMaxDuration && matchesSearch;
    });
  }, [missions, filters, searchTerm, getAgencyNameById, getMissionTypeNameById]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
    setSearchTerm('');
  };

  const openAddMissionModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditMissionPage = (mission: Mission) => {
    if (!isSuperUserAdmin) {
      toast({
        variant: "destructive",
        title: "Admin Access Required",
        description: "You must be an administrator with Admin Mode enabled to edit missions.",
      });
      return;
    }
    router.push(`/admin/edit-mission/${mission.id}`);
  };

  const confirmDeleteMission = (missionId: string) => {
     if (!isSuperUserAdmin) {
      toast({
        variant: "destructive",
        title: "Admin Access Required",
        description: "You must be an administrator with Admin Mode enabled to delete missions.",
      });
      return;
    }
    setMissionToDeleteId(missionId);
  };

  const handleDeleteMission = () => {
    if (!missionToDeleteId) return;
     if (!isSuperUserAdmin) {
      toast({
        variant: "destructive",
        title: "Unauthorized Action",
        description: "Deletion cancelled. You are not an authorized admin.",
      });
      setMissionToDeleteId(null);
      return;
    }
    const updatedMissions = missions.filter(m => m.id !== missionToDeleteId);
    saveMissionsToStorage(updatedMissions);
    toast({
      title: "Mission Deleted",
      description: "The mission has been successfully deleted.",
    });
    setMissionToDeleteId(null); 
  };
  
  const handleSaveNewMission = (data: AddMissionFormData) => {
    if (!isSuperUserAdmin) { 
     toast({
       variant: "destructive",
       title: "Admin Access Required",
       description: "You must be an administrator with Admin Mode enabled to add missions.",
     });
     setIsAddModalOpen(false);
     return;
   }

   const newMission: Mission = {
     ...data,
     id: crypto.randomUUID(),
     launchDate: parseISO(data.launchDate).toISOString(),
     imageUrl: `https://placehold.co/600x400.png`,
     target: { body: data.targetDestination },
     objectives: [],
     spacecraft: { name: 'TBD', type: 'TBD', features: [] },
     instruments: [],
     launch_vehicle: 'TBD',
     duration: 'TBD',
     science_return: { expected_outcomes: [] },
     links: {},
     events: [],
   };
   
   const updatedMissions = [newMission, ...missions];
   saveMissionsToStorage(updatedMissions);

   toast({
     title: "Mission Added",
     description: `${newMission.name} has been successfully added.`,
   });

   setIsAddModalOpen(false);
 };

  const missionsByYearData = useMemo(() => {
    if (!filteredMissions.length) return [];
    const yearCounts = filteredMissions.reduce((acc, mission) => {
      const date = parseISO(mission.launchDate);
      if (!isValid(date)) return acc;
      const year = date.getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(yearCounts)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);
  }, [filteredMissions]);

  const missionsByTypeData = useMemo(() => {
    if (!filteredMissions.length) return [];
    const typeCounts = filteredMissions.reduce((acc, mission) => {
      const typeName = getMissionTypeNameById(mission.missionTypeId);
      acc[typeName] = (acc[typeName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts)
      .map(([typeName, count], index) => ({
        name: typeName, 
        value: count, 
        fill: CHART_COLORS_HSL[index % CHART_COLORS_HSL.length],
      }))
      .sort((a,b) => b.value - a.value);
  }, [filteredMissions, getMissionTypeNameById]);

  const missionsByAgencyData = useMemo(() => {
    if (!filteredMissions.length) return [];
    const agencyCounts = filteredMissions.reduce((acc, mission) => {
      const agencyName = getAgencyNameById(mission.agencyId);
      acc[agencyName] = (acc[agencyName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(agencyCounts)
      .map(([agencyName, count], index) => ({
        name: agencyName,
        value: count,
        fill: CHART_COLORS_HSL[index % CHART_COLORS_HSL.length],
      }))
      .sort((a,b) => b.value - a.value);
  }, [filteredMissions, getAgencyNameById]);

  const missionsByStatusData = useMemo(() => {
    if (!filteredMissions.length) return [];
    const statusCounts = filteredMissions.reduce((acc, mission) => {
      const status = mission.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const statusOrder: Mission['status'][] = ['Planned', 'Ongoing', 'Completed', 'Failed'];

    return Object.entries(statusCounts)
      .map(([statusName, count], index) => ({
        name: statusName,
        value: count,
        fill: CHART_COLORS_HSL[index % CHART_COLORS_HSL.length],
      }))
      .sort((a,b) => statusOrder.indexOf(a.name as Mission['status']) - statusOrder.indexOf(b.name as Mission['status']));
  }, [filteredMissions]);

  const barChartConfig = {
    count: {
      label: "Missions",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

   const pieChartConfig = (data: {name: string; value: number; fill: string}[]) => {
    const config: ChartConfig = {};
    data.forEach(entry => {
      config[entry.name] = { label: entry.name, color: entry.fill };
    });
    return config;
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Compass className="w-10 h-10 text-primary mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-primary">Explore Space Missions</h1>
          <p className="text-muted-foreground">Discover and filter through a universe of missions.</p>
        </div>
      </div>

      {!isSuperUserAdmin && (
        <Alert variant="default" className="mb-6 bg-secondary border-secondary-foreground/20">
          <Info className="h-5 w-5 text-secondary-foreground" />
          <AlertTitle className="font-semibold text-secondary-foreground">Read-Only Mode</AlertTitle>
          <AlertDescription className="text-secondary-foreground/80">
            You are viewing in read-only mode. Admin privileges are required to add, edit, or delete missions.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search missions (name, description, agency, type, year, events...)"
            className="pl-10 w-full text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search missions"
          />
        </div>
         <Button onClick={resetAllFilters} variant="outline" className="w-full sm:w-auto">
          <FilterX className="mr-2 h-5 w-5" /> Reset Filters
        </Button>
        {isSuperUserAdmin && (
          <Button onClick={openAddMissionModal} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-5 w-5" /> Add Mission
          </Button>
        )}
      </div>

      <MissionFilters 
        years={uniqueYears} 
        missionTypes={missionTypes} 
        agencies={agencies} 
        destinations={uniqueDestinations}
        missionStatuses={['Planned', 'Ongoing', 'Completed', 'Failed']}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <section id="mission-statistics" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Mission Statistics (Based on Filters)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
               <CalendarDays className="mr-2 h-5 w-5 text-primary"/>
                Missions Launched Per Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              {missionsByYearData.length > 0 ? (
                <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart accessibilityLayer data={missionsByYearData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} allowDecimals={false}/>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8 h-[300px] flex items-center justify-center">No data available for this chart based on current filters.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="mr-2 h-5 w-5 text-primary"/>
                Missions By Type
                </CardTitle>
            </CardHeader>
            <CardContent>
              {missionsByTypeData.length > 0 ? (
                <ChartContainer config={pieChartConfig(missionsByTypeData)} className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart accessibilityLayer>
                      <RechartsTooltip content={<ChartTooltipContent indicator="dot" hideLabel />} />
                      <Pie
                        data={missionsByTypeData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        strokeWidth={2}
                      >
                        {missionsByTypeData.map((entry, index) => (
                          <RechartsCell key={`cell-type-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                        className="-translate-y-2"
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8 h-[300px] flex items-center justify-center">No data available for this chart based on current filters.</p>
              )}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-primary"/>
                Missions By Agency
              </CardTitle>
            </CardHeader>
            <CardContent>
              {missionsByAgencyData.length > 0 ? (
                <ChartContainer config={pieChartConfig(missionsByAgencyData)} className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart accessibilityLayer>
                      <RechartsTooltip content={<ChartTooltipContent indicator="dot" hideLabel />} />
                      <Pie
                        data={missionsByAgencyData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        strokeWidth={2}
                      >
                        {missionsByAgencyData.map((entry, index) => (
                          <RechartsCell key={`cell-agency-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                        className="-translate-y-2"
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8 h-[300px] flex items-center justify-center">No data available for this chart based on current filters.</p>
              )}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Missions By Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {missionsByStatusData.length > 0 ? (
                <ChartContainer config={pieChartConfig(missionsByStatusData)} className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart accessibilityLayer>
                      <RechartsTooltip content={<ChartTooltipContent indicator="dot" hideLabel />} />
                      <Pie
                        data={missionsByStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        strokeWidth={2}
                      >
                        {missionsByStatusData.map((entry, index) => (
                          <RechartsCell key={`cell-status-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                        className="-translate-y-2"
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8 h-[300px] flex items-center justify-center">No data available for this chart based on current filters.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section id="mission-cards" className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Explore Missions ({filteredMissions.length} found)</h2>
        </div>
        {filteredMissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map(mission => (
              <MissionCard 
                key={mission.id} 
                mission={mission}
                agency={agencies.find(a => a.id === mission.agencyId)}
                missionType={missionTypes.find(mt => mt.id === mission.missionTypeId)}
                onEdit={openEditMissionPage}
                onDelete={confirmDeleteMission}
                canManage={isSuperUserAdmin}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No missions match your criteria. Try adjusting the filters or search term.</p>
        )}
      </section>

      {isSuperUserAdmin && (
        <AddMissionDialog
          isOpen={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSave={handleSaveNewMission}
          agencies={agencies}
          missionTypes={missionTypes}
        />
      )}

      {isSuperUserAdmin && (
        <AlertDialog open={!!missionToDeleteId} onOpenChange={() => setMissionToDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the mission
                and remove its data from our servers (simulated).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setMissionToDeleteId(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMission} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
