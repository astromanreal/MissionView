
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { toast } from '@/hooks/use-toast';
import type { Mission, Agency, MissionType, EditMissionFormData } from '@/types/mission';
import { editMissionFormSchema } from '@/types/mission';
import { mockAgencies, mockMissionTypes } from '@/lib/mock-data';
import { ArrowLeft, Trash2, PlusCircle, Save } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';

const MISSIONS_STORAGE_KEY = 'missions_data';
const missionStatuses: Mission['status'][] = ['Planned', 'Ongoing', 'Completed', 'Failed'];

export default function EditMissionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [mission, setMission] = useState<Mission | null>(null);
  const [agencies] = useState<Agency[]>(mockAgencies);
  const [missionTypes] = useState<MissionType[]>(mockMissionTypes);
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditMissionFormData>({
    resolver: zodResolver(editMissionFormSchema),
  });

  const { fields: objectivesFields, append: appendObjective, remove: removeObjective } = useFieldArray({ control, name: "objectives" });
  const { fields: featuresFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "spacecraft.features" });
  const { fields: instrumentsFields, append: appendInstrument, remove: removeInstrument } = useFieldArray({ control, name: "instruments" });
  const { fields: outcomesFields, append: appendOutcome, remove: removeOutcome } = useFieldArray({ control, name: "science_return.expected_outcomes" });

  useEffect(() => {
    if (id) {
      try {
        const storedMissions = localStorage.getItem(MISSIONS_STORAGE_KEY);
        if (storedMissions) {
          const allMissions: Mission[] = JSON.parse(storedMissions);
          const missionToEdit = allMissions.find(m => m.id === id);
          if (missionToEdit) {
            setMission(missionToEdit);
            // Populate form with existing data
            reset({
              ...missionToEdit,
              launchDate: missionToEdit.launchDate ? format(parseISO(missionToEdit.launchDate), "yyyy-MM-dd") : "",
              endDate: missionToEdit.endDate ? format(parseISO(missionToEdit.endDate), "yyyy-MM-dd") : "",
              objectives: missionToEdit.objectives.map(o => ({ value: o })),
              spacecraft: {
                ...missionToEdit.spacecraft,
                features: missionToEdit.spacecraft.features.map(f => ({ value: f })),
              },
              instruments: missionToEdit.instruments,
              science_return: {
                ...missionToEdit.science_return,
                expected_outcomes: missionToEdit.science_return.expected_outcomes.map(o => ({ value: o })),
              },
              imageUrl: missionToEdit.imageUrl || "",
              links: {
                official_site: missionToEdit.links.official_site || "",
                press_release: missionToEdit.links.press_release || "",
              }
            });
          }
        }
      } catch (e) {
        console.error("Failed to load or parse mission data from storage", e);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load mission data.' });
      }
    }
  }, [id, reset]);

  const onSubmit = (data: EditMissionFormData) => {
    try {
        const storedMissions = localStorage.getItem(MISSIONS_STORAGE_KEY);
        if(!storedMissions) throw new Error("Mission data not found in storage.");

        const allMissions: Mission[] = JSON.parse(storedMissions);
        const missionIndex = allMissions.findIndex(m => m.id === id);

        if(missionIndex === -1) throw new Error("Mission not found for update.");

        const updatedMission: Mission = {
            ...allMissions[missionIndex],
            ...data,
            launchDate: parseISO(data.launchDate).toISOString(),
            endDate: data.endDate ? parseISO(data.endDate).toISOString() : undefined,
            objectives: data.objectives.map(o => o.value),
            spacecraft: {
                ...data.spacecraft,
                features: data.spacecraft.features.map(f => f.value),
            },
            instruments: data.instruments,
            science_return: {
                ...data.science_return,
                expected_outcomes: data.science_return.expected_outcomes.map(o => o.value),
            },
            links: {
                official_site: data.links?.official_site,
                press_release: data.links?.press_release,
            },
        };

        allMissions[missionIndex] = updatedMission;
        localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(allMissions));
        
        toast({ title: 'Success', description: `${data.name} has been updated.` });
        router.push('/admin');

    } catch (e) {
        console.error("Failed to save mission", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        toast({ variant: 'destructive', title: 'Save Failed', description: errorMessage });
    }
  };
  
  const FieldArrayManager = ({ title, name, fields, remove, append, nameLabel, valueLabel, nameKey = 'name', valueKey = 'value' }: any) => {
    const isSimpleList = !valueLabel;
    
    return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">{title}</h4>
        <Button type="button" variant="outline" size="sm" onClick={() => append(isSimpleList ? { value: '' } : { [nameKey]: '', [valueKey]: '' })}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
        {fields.map((field: any, index: number) => (
          <div key={field.id} className="flex gap-2 items-start p-3 border rounded-md bg-muted/50">
            <div className="flex-grow space-y-2">
              <Input {...register(isSimpleList ? `${name}.${index}.value` : `${name}.${index}.${nameKey}`)} placeholder={nameLabel} />
              {!isSimpleList && <Textarea {...register(`${name}.${index}.${valueKey}`)} placeholder={valueLabel} className="min-h-[60px]" />}
            </div>
            <Button type="button" variant="destructive" size="icon" className="w-9 h-9 mt-1" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {fields.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No {title.toLowerCase()} added.</p>}
      </div>
    </div>
  )};


  if (!mission) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Loading mission...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="flex justify-between items-center mb-8">
          <div>
            <Button type="button" variant="ghost" onClick={() => router.back()} className="-ml-4 mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
            </Button>
            <h1 className="text-3xl font-bold text-primary">Edit Mission: {mission.name}</h1>
            <p className="text-muted-foreground">Make changes to the mission details below.</p>
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            <Save className="mr-2 h-5 w-5" /> {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Details Column */}
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader><CardTitle>Core Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">Mission Name</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register("description")} className="min-h-[120px]" />
                            {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                  <CardHeader><CardTitle>Spacecraft & Vehicle</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="spacecraft.name">Spacecraft Name</Label>
                          <Input id="spacecraft.name" {...register("spacecraft.name")} />
                          {errors.spacecraft?.name && <p className="text-destructive text-sm mt-1">{errors.spacecraft.name.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="spacecraft.type">Spacecraft Type</Label>
                          <Input id="spacecraft.type" {...register("spacecraft.type")} />
                           {errors.spacecraft?.type && <p className="text-destructive text-sm mt-1">{errors.spacecraft.type.message}</p>}
                        </div>
                     </div>
                     <FieldArrayManager title="Features" name="spacecraft.features" fields={featuresFields} remove={removeFeature} append={appendFeature} nameLabel="Feature" />
                  </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Objectives</CardTitle></CardHeader>
                    <CardContent>
                        <FieldArrayManager title="Objectives" name="objectives" fields={objectivesFields} remove={removeObjective} append={appendObjective} nameLabel="Objective" />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Instruments</CardTitle></CardHeader>
                    <CardContent>
                       <FieldArrayManager title="Instruments" name="instruments" fields={instrumentsFields} remove={removeInstrument} append={appendInstrument} nameLabel="Instrument Name" valueLabel="Function" nameKey="name" valueKey="function"/>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>Science Return</CardTitle></CardHeader>
                    <CardContent>
                       <FieldArrayManager title="Expected Outcomes" name="science_return.expected_outcomes" fields={outcomesFields} remove={removeOutcome} append={appendOutcome} nameLabel="Expected Outcome" />
                    </CardContent>
                </Card>

            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Configuration</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       <div>
                            <Label htmlFor="status">Status</Label>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {missionStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="agencyId">Agency</Label>
                            <Controller
                                control={control}
                                name="agencyId"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {agencies.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                         <div>
                            <Label htmlFor="missionTypeId">Mission Type</Label>
                            <Controller
                                control={control}
                                name="missionTypeId"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {missionTypes.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Timeline & Logistics</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <Label htmlFor="launchDate">Launch Date</Label>
                          <Input id="launchDate" type="date" {...register("launchDate")} />
                          {errors.launchDate && <p className="text-destructive text-sm mt-1">{errors.launchDate.message}</p>}
                      </div>
                      <div>
                          <Label htmlFor="endDate">End Date (Optional)</Label>
                          <Input id="endDate" type="date" {...register("endDate")} />
                      </div>
                      <div>
                          <Label htmlFor="duration">Duration</Label>
                          <Input id="duration" {...register("duration")} />
                          {errors.duration && <p className="text-destructive text-sm mt-1">{errors.duration.message}</p>}
                      </div>
                       <div>
                          <Label htmlFor="launch_vehicle">Launch Vehicle</Label>
                          <Input id="launch_vehicle" {...register("launch_vehicle")} />
                          {errors.launch_vehicle && <p className="text-destructive text-sm mt-1">{errors.launch_vehicle.message}</p>}
                      </div>
                      <div>
                          <Label htmlFor="targetDestination">Target Destination</Label>
                          <Input id="targetDestination" {...register("targetDestination")} />
                          {errors.targetDestination && <p className="text-destructive text-sm mt-1">{errors.targetDestination.message}</p>}
                      </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Media & Links</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <Label htmlFor="imageUrl">Image URL</Label>
                          <Input id="imageUrl" {...register("imageUrl")} />
                           {errors.imageUrl && <p className="text-destructive text-sm mt-1">{errors.imageUrl.message}</p>}
                      </div>
                      <div>
                          <Label htmlFor="links.official_site">Official Site URL</Label>
                          <Input id="links.official_site" {...register("links.official_site")} />
                          {errors.links?.official_site && <p className="text-destructive text-sm mt-1">{errors.links.official_site.message}</p>}
                      </div>
                       <div>
                          <Label htmlFor="links.press_release">Press Release URL</Label>
                          <Input id="links.press_release" {...register("links.press_release")} />
                          {errors.links?.press_release && <p className="text-destructive text-sm mt-1">{errors.links.press_release.message}</p>}
                      </div>
                  </CardContent>
                </Card>
            </div>
        </div>
      </form>
    </div>
  );
}
