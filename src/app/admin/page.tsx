
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Mission, Agency, MissionType, AddMissionFormData, AgencyFormData, MissionTypeFormData } from '@/types/mission';
import { mockMissions, mockAgencies, mockMissionTypes } from '@/lib/mock-data';
import { AddMissionDialog } from '@/components/add-mission-dialog';
import { AddEditAgencyDialog } from '@/components/add-edit-agency-dialog';
import { AddEditMissionTypeDialog } from '@/components/add-edit-mission-type-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Rocket, 
  ClipboardList, 
  Hourglass, 
  CheckCircle2, 
  XCircle, 
  Building2,
  ShieldAlert,
  Tag,
  LogIn,
} from 'lucide-react';
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
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/types/auth';
import { format, parseISO, isValid } from 'date-fns';
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  className?: string;
}

function StatCard({ title, value, icon: Icon, description, className }: StatCardProps) {
  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}


export default function AdminPage() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [missionTypes, setMissionTypes] = useState<MissionType[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [missionToDeleteId, setMissionToDeleteId] = useState<string | null>(null);

  const [isAddEditAgencyModalOpen, setIsAddEditAgencyModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [agencyToDeleteId, setAgencyToDeleteId] = useState<string | null>(null);

  const [isAddEditMissionTypeModalOpen, setIsAddEditMissionTypeModalOpen] = useState(false);
  const [editingMissionType, setEditingMissionType] = useState<MissionType | null>(null);
  const [missionTypeToDeleteId, setMissionTypeToDeleteId] = useState<string | null>(null);

  const [showLogin, setShowLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const { toast } = useToast();
  const { currentUser, isSuperUserAdmin, login } = useAuth();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    setLoginMessage(null);
    const result = await login(data);
    if (result.success && result.user) {
      if (result.user.userType === 'admin') {
        toast({
          title: 'Admin Login Successful!',
          description: `Welcome, ${result.user.username}. You can now enable Admin Mode from the sidebar.`,
        });
        setShowLogin(false);
      } else {
        setLoginMessage(`Access Denied. You are not an administrator. Your user type is '${result.user.userType}'.`);
      }
    } else {
      setLoginMessage(result.message);
    }
  };

  useEffect(() => {
    try {
      const storedMissions = localStorage.getItem('missions_data');
      if (storedMissions) {
        setMissions(JSON.parse(storedMissions));
      } else {
        setMissions(mockMissions);
        localStorage.setItem('missions_data', JSON.stringify(mockMissions));
      }
    } catch (error) {
        console.error("Could not parse missions from localStorage", error);
        setMissions(mockMissions);
    }

    setAgencies(JSON.parse(JSON.stringify(mockAgencies)));
    setMissionTypes(JSON.parse(JSON.stringify(mockMissionTypes)));
    
  }, []);

  const saveMissionsToStorage = (updatedMissions: Mission[]) => {
    localStorage.setItem('missions_data', JSON.stringify(updatedMissions));
    setMissions(updatedMissions);
  };
  
  useEffect(() => {
    if (!isSuperUserAdmin) {
      setIsAddModalOpen(false);
      setMissionToDeleteId(null);
      setIsAddEditAgencyModalOpen(false);
      setAgencyToDeleteId(null);
      setIsAddEditMissionTypeModalOpen(false);
      setMissionTypeToDeleteId(null);
    }
  }, [isSuperUserAdmin]);

  const getAgencyNameById = useCallback((id: string) => agencies.find(a => a.id === id)?.name || 'Unknown Agency', [agencies]);
  const getMissionTypeNameById = useCallback((id: string) => missionTypes.find(mt => mt.id === id)?.name || 'Unknown Type', [missionTypes]);

  // Mission Handlers
  const openAddMissionModal = () => setIsAddModalOpen(true);
  const openEditMissionPage = (missionId: string) => router.push(`/admin/edit-mission/${missionId}`);
  const confirmDeleteMission = (missionId: string) => setMissionToDeleteId(missionId);

  const handleDeleteMission = () => {
    if (!missionToDeleteId) return;
    const deletedMissionName = missions.find(m => m.id === missionToDeleteId)?.name || "The mission";
    const updatedMissions = missions.filter(m => m.id !== missionToDeleteId);
    saveMissionsToStorage(updatedMissions);
    toast({ title: "Mission Deleted", description: `${deletedMissionName} has been successfully deleted.` });
    setMissionToDeleteId(null);
  };

  const handleSaveNewMission = (data: AddMissionFormData) => {
    const newMission: Mission = {
      ...data,
      id: crypto.randomUUID(),
      launchDate: parseISO(data.launchDate).toISOString(),
      imageUrl: `https://placehold.co/600x400.png`,
      // Add default empty values for detailed fields
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
    toast({ title: "Mission Added", description: `${newMission.name} added. It can now be edited to add full details.` });
    setIsAddModalOpen(false);
  };
  
  // Agency Handlers
  const openAddAgencyModal = () => { setEditingAgency(null); setIsAddEditAgencyModalOpen(true); };
  const openEditAgencyModal = (agency: Agency) => { setEditingAgency(agency); setIsAddEditAgencyModalOpen(true); };
  const confirmDeleteAgency = (id: string) => setAgencyToDeleteId(id);
  const handleDeleteAgency = () => {
    if (!agencyToDeleteId) return;
    const missionsUsingAgency = missions.filter(m => m.agencyId === agencyToDeleteId);
    if (missionsUsingAgency.length > 0) {
      toast({
        variant: "destructive",
        title: "Cannot Delete Agency",
        description: `Agency is used by ${missionsUsingAgency.length} mission(s). Please update these missions first or delete them.`,
      });
    } else {
      const deletedName = agencies.find(a => a.id === agencyToDeleteId)?.name || "The agency";
      setAgencies(prev => prev.filter(a => a.id !== agencyToDeleteId));
      toast({ title: "Agency Deleted", description: `${deletedName} has been successfully deleted.` });
    }
    setAgencyToDeleteId(null);
  };
  const handleSaveAgency = (data: AgencyFormData) => {
    if (editingAgency) {
      setAgencies(prev => prev.map(a => (a.id === editingAgency.id ? { ...editingAgency, ...data } : a)));
      toast({ title: "Agency Updated", description: `${data.name} updated.` });
    } else {
      const newAgency: Agency = { ...data, id: crypto.randomUUID() };
      setAgencies(prev => [newAgency, ...prev]);
      toast({ title: "Agency Added", description: `${newAgency.name} added.` });
    }
    setIsAddEditAgencyModalOpen(false);
  };

  // MissionType Handlers
  const openAddMissionTypeModal = () => { setEditingMissionType(null); setIsAddEditMissionTypeModalOpen(true); };
  const openEditMissionTypeModal = (mt: MissionType) => { setEditingMissionType(mt); setIsAddEditMissionTypeModalOpen(true); };
  const confirmDeleteMissionType = (id: string) => setMissionTypeToDeleteId(id);
  const handleDeleteMissionType = () => {
    if (!missionTypeToDeleteId) return;
    const missionsUsingType = missions.filter(m => m.missionTypeId === missionTypeToDeleteId);
    if (missionsUsingType.length > 0) {
      toast({
        variant: "destructive",
        title: "Cannot Delete Mission Type",
        description: `Mission Type is used by ${missionsUsingType.length} mission(s). Please update these missions first or delete them.`,
      });
    } else {
      const deletedName = missionTypes.find(mt => mt.id === missionTypeToDeleteId)?.name || "The type";
      setMissionTypes(prev => prev.filter(mt => mt.id !== missionTypeToDeleteId));
      toast({ title: "Mission Type Deleted", description: `${deletedName} has been successfully deleted.` });
    }
    setMissionTypeToDeleteId(null);
  };
  const handleSaveMissionType = (data: MissionTypeFormData) => {
    if (editingMissionType) {
      setMissionTypes(prev => prev.map(mt => (mt.id === editingMissionType.id ? { ...editingMissionType, ...data } : mt)));
      toast({ title: "Mission Type Updated", description: `${data.name} updated.` });
    } else {
      const newMissionType: MissionType = { ...data, id: crypto.randomUUID(), description: data.description || '' };
      setMissionTypes(prev => [newMissionType, ...prev]);
      toast({ title: "Mission Type Added", description: `${newMissionType.name} added.` });
    }
    setIsAddEditMissionTypeModalOpen(false);
  };

  const sortedMissions = useMemo(() => [...missions].sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()), [missions]);
  const sortedAgencies = useMemo(() => [...agencies].sort((a, b) => a.name.localeCompare(b.name)), [agencies]);
  const sortedMissionTypes = useMemo(() => [...missionTypes].sort((a, b) => a.name.localeCompare(b.name)), [missionTypes]);

  const missionStats = useMemo(() => ({
    total: missions.length,
    planned: missions.filter(m => m.status === 'Planned').length,
    ongoing: missions.filter(m => m.status === 'Ongoing').length,
    completed: missions.filter(m => m.status === 'Completed').length,
    failed: missions.filter(m => m.status === 'Failed').length,
    totalAgencies: agencies.length,
    totalMissionTypes: missionTypes.length,
  }), [missions, agencies, missionTypes]);


  if (!isSuperUserAdmin) {
    if (showLogin) {
      return (
        <div className="container mx-auto flex h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
              <CardDescription>
                Please log in with an administrator account to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                {loginMessage && (
                   <Alert variant="destructive">
                     <AlertTitle>Login Error</AlertTitle>
                     <AlertDescription>{loginMessage}</AlertDescription>
                   </Alert>
                )}
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="admin@example.com"
                    {...registerLogin('email')}
                    className={loginErrors.email ? 'border-destructive' : ''}
                    aria-invalid={loginErrors.email ? "true" : "false"}
                  />
                  {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••"
                    {...registerLogin('password')}
                    className={loginErrors.password ? 'border-destructive' : ''}
                    aria-invalid={loginErrors.password ? "true" : "false"}
                  />
                 {loginErrors.password && <p className="text-sm text-destructive mt-1">{loginErrors.password.message}</p>}
                </div>
                <div className="flex items-center gap-4 pt-2">
                   <Button type="button" variant="outline" onClick={() => setShowLogin(false)} className="w-1/3">
                      Cancel
                   </Button>
                  <Button type="submit" className="w-2/3" disabled={isLoginSubmitting}>
                    <LogIn className="mr-2 h-5 w-5" /> {isLoginSubmitting ? 'Logging in...' : 'Login as Admin'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="max-w-lg mx-auto shadow-xl border-primary/30 bg-card">
          <CardHeader className="items-center">
            <ShieldAlert className="w-16 h-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-semibold text-foreground">Admin Access Required</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              This area requires administrator privileges with Admin Mode enabled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentUser && currentUser.userType !== 'admin' && (
              <Alert variant="destructive" className="mb-6 text-left">
                <AlertTitle>Permission Denied</AlertTitle>
                <AlertDescription>You are currently logged in as a '{currentUser.userType}'. You must log in with an admin account.</AlertDescription>
              </Alert>
            )}
            <p className="text-muted-foreground mb-6">
              Please log in with an administrator account. If you are already logged in as an admin, enable Admin Mode in the sidebar.
            </p>
            <Button onClick={() => setShowLogin(true)} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <LogIn className="mr-2 h-5 w-5" /> Proceed to Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview and management of all space missions, agencies, and types.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-10">
          <StatCard title="Total Missions" value={missionStats.total} icon={Rocket} />
          <StatCard title="Planned" value={missionStats.planned} icon={ClipboardList} className="border-blue-500/50"/>
          <StatCard title="Ongoing" value={missionStats.ongoing} icon={Hourglass} className="border-yellow-500/50"/>
          <StatCard title="Completed" value={missionStats.completed} icon={CheckCircle2} className="border-green-500/50"/>
          <StatCard title="Failed" value={missionStats.failed} icon={XCircle} className="border-red-500/50"/>
          <StatCard title="Agencies" value={missionStats.totalAgencies} icon={Building2} />
          <StatCard title="Mission Types" value={missionStats.totalMissionTypes} icon={Tag} />
        </div>
        
        {/* Mission Management Card */}
        <Card className="shadow-xl border-border/70 mb-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6 px-6">
            <div>
              <CardTitle className="text-2xl font-semibold text-foreground flex items-center"><Rocket className="mr-3 h-7 w-7 text-primary"/>Mission Management</CardTitle>
              <CardDescription>View, add, edit, or delete missions.</CardDescription>
            </div>
            <Button onClick={openAddMissionModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Mission
            </Button>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {sortedMissions.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-border">
                <Table>
                  <TableHeader><TableRow className="bg-muted/50 hover:bg-muted/60">
                      <TableHead className="w-[250px] px-4 py-3">Name</TableHead>
                      <TableHead className="px-4 py-3">Agency</TableHead>
                      <TableHead className="px-4 py-3">Type</TableHead>
                      <TableHead className="px-4 py-3">Launch Date</TableHead>
                      <TableHead className="px-4 py-3">Status</TableHead>
                      <TableHead className="text-right px-4 py-3">Actions</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {sortedMissions.map(mission => (
                      <TableRow key={mission.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium max-w-xs truncate px-4 py-3" title={mission.name}>{mission.name}</TableCell>
                        <TableCell className="px-4 py-3">{getAgencyNameById(mission.agencyId)}</TableCell>
                        <TableCell className="px-4 py-3">{getMissionTypeNameById(mission.missionTypeId)}</TableCell>
                        <TableCell className="px-4 py-3">{isValid(parseISO(mission.launchDate)) ? format(parseISO(mission.launchDate), 'MMM dd, yyyy') : 'Invalid Date'}</TableCell>
                        <TableCell className="px-4 py-3">
                          <Badge variant={mission.status === 'Ongoing' ? 'default' : mission.status === 'Completed' ? 'secondary' : mission.status === 'Failed' ? 'destructive' : 'outline'}
                             className={`capitalize ${mission.status === 'Ongoing' ? 'bg-yellow-500/80 hover:bg-yellow-500/70 text-yellow-foreground' : ''} ${mission.status === 'Planned' ? 'bg-blue-500/80 hover:bg-blue-500/70 text-blue-foreground' : ''} ${mission.status === 'Completed' ? 'bg-green-500/80 hover:bg-green-500/70 text-green-foreground' : ''} ${mission.status === 'Failed' ? 'bg-red-500/80 hover:bg-red-500/70 text-red-foreground' : ''} font-semibold`}>
                            {mission.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-4 py-3"><div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => openEditMissionPage(mission.id)} aria-label={`Edit ${mission.name}`} className="h-8 w-8 p-0"><Edit className="w-4 h-4" /></Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDeleteMission(mission.id)} aria-label={`Delete ${mission.name}`} className="h-8 w-8 p-0"><Trash2 className="w-4 h-4" /></Button>
                        </div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12"><Rocket className="mx-auto h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground text-lg">No missions available.</p>
                <Button onClick={openAddMissionModal} className="bg-primary hover:bg-primary/90 mt-4"><PlusCircle className="mr-2 h-5 w-5" /> Add First Mission</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Agency Management Card */}
        <Card className="shadow-xl border-border/70 mb-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6 px-6">
                <div>
                    <CardTitle className="text-2xl font-semibold text-foreground flex items-center"><Building2 className="mr-3 h-7 w-7 text-primary"/>Agency Management</CardTitle>
                    <CardDescription>View, add, edit, or delete space agencies.</CardDescription>
                </div>
                <Button onClick={openAddAgencyModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Agency
                </Button>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                {sortedAgencies.length > 0 ? (
                    <div className="overflow-x-auto rounded-md border border-border">
                        <Table>
                            <TableHeader><TableRow className="bg-muted/50 hover:bg-muted/60">
                                <TableHead className="px-4 py-3">Name</TableHead>
                                <TableHead className="px-4 py-3">Country</TableHead>
                                <TableHead className="text-right px-4 py-3">Actions</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {sortedAgencies.map(agency => (
                                    <TableRow key={agency.id} className="hover:bg-muted/30">
                                        <TableCell className="font-medium px-4 py-3">{agency.name}</TableCell>
                                        <TableCell className="px-4 py-3">{agency.country || 'N/A'}</TableCell>
                                        <TableCell className="text-right px-4 py-3"><div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => openEditAgencyModal(agency)} aria-label={`Edit ${agency.name}`} className="h-8 w-8 p-0"><Edit className="w-4 h-4" /></Button>
                                            <Button variant="destructive" size="sm" onClick={() => confirmDeleteAgency(agency.id)} aria-label={`Delete ${agency.name}`} className="h-8 w-8 p-0"><Trash2 className="w-4 h-4" /></Button>
                                        </div></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-12"><Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground text-lg">No agencies available.</p>
                        <Button onClick={openAddAgencyModal} className="bg-primary hover:bg-primary/90 mt-4"><PlusCircle className="mr-2 h-5 w-5" /> Add First Agency</Button>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Mission Type Management Card */}
        <Card className="shadow-xl border-border/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6 px-6">
                <div>
                    <CardTitle className="text-2xl font-semibold text-foreground flex items-center"><Tag className="mr-3 h-7 w-7 text-primary"/>Mission Type Management</CardTitle>
                    <CardDescription>View, add, edit, or delete mission types.</CardDescription>
                </div>
                <Button onClick={openAddMissionTypeModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Type
                </Button>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                {sortedMissionTypes.length > 0 ? (
                     <div className="overflow-x-auto rounded-md border border-border">
                        <Table>
                            <TableHeader><TableRow className="bg-muted/50 hover:bg-muted/60">
                                <TableHead className="px-4 py-3">Name</TableHead>
                                <TableHead className="px-4 py-3">Description</TableHead>
                                <TableHead className="text-right px-4 py-3">Actions</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {sortedMissionTypes.map(type => (
                                    <TableRow key={type.id} className="hover:bg-muted/30">
                                        <TableCell className="font-medium px-4 py-3">{type.name}</TableCell>
                                        <TableCell className="px-4 py-3 max-w-md truncate" title={type.description}>{type.description || 'N/A'}</TableCell>
                                        <TableCell className="text-right px-4 py-3"><div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => openEditMissionTypeModal(type)} aria-label={`Edit ${type.name}`} className="h-8 w-8 p-0"><Edit className="w-4 h-4" /></Button>
                                            <Button variant="destructive" size="sm" onClick={() => confirmDeleteMissionType(type.id)} aria-label={`Delete ${type.name}`} className="h-8 w-8 p-0"><Trash2 className="w-4 h-4" /></Button>
                                        </div></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                     <div className="text-center py-12"><Tag className="mx-auto h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground text-lg">No mission types available.</p>
                        <Button onClick={openAddMissionTypeModal} className="bg-primary hover:bg-primary/90 mt-4"><PlusCircle className="mr-2 h-5 w-5" /> Add First Type</Button>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AddMissionDialog isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleSaveNewMission} agencies={agencies} missionTypes={missionTypes} />
      <AddEditAgencyDialog isOpen={isAddEditAgencyModalOpen} onOpenChange={setIsAddEditAgencyModalOpen} onSave={handleSaveAgency} agencyToEdit={editingAgency} />
      <AddEditMissionTypeDialog isOpen={isAddEditMissionTypeModalOpen} onOpenChange={setIsAddEditMissionTypeModalOpen} onSave={handleSaveMissionType} missionTypeToEdit={editingMissionType} />

      {/* Delete Confirmation Dialogs */}
      <AlertDialog open={!!missionToDeleteId} onOpenChange={() => setMissionToDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Mission?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the mission: {missions.find(m => m.id === missionToDeleteId)?.name}. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteMission} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={!!agencyToDeleteId} onOpenChange={() => setAgencyToDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Agency?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the agency: {agencies.find(a => a.id === agencyToDeleteId)?.name}. This action cannot be undone. Ensure no missions are using this agency.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteAgency} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={!!missionTypeToDeleteId} onOpenChange={() => setMissionTypeToDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Mission Type?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the type: {missionTypes.find(mt => mt.id === missionTypeToDeleteId)?.name}. This action cannot be undone. Ensure no missions are using this type.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteMissionType} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
