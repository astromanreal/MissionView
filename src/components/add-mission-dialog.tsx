import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Mission, AddMissionFormData, Agency, MissionType } from "@/types/mission";
import { addMissionFormSchema } from "@/types/mission";
import { useEffect } from "react";

interface AddMissionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: AddMissionFormData) => void;
  agencies: Agency[];
  missionTypes: MissionType[];
}

const missionStatuses: Mission['status'][] = ['Planned', 'Ongoing', 'Completed', 'Failed'];

export function AddMissionDialog({
  isOpen,
  onOpenChange,
  onSave,
  agencies,
  missionTypes,
}: AddMissionDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<AddMissionFormData>({
    resolver: zodResolver(addMissionFormSchema),
    defaultValues: {
      agencyId: '',
      missionTypeId: '',
      status: 'Planned',
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        description: "",
        launchDate: "",
        agencyId: "",
        missionTypeId: "",
        targetDestination: "",
        status: "Planned",
      });
    }
  }, [isOpen, reset]);

  const onSubmit = (data: AddMissionFormData) => {
    onSave(data);
    onOpenChange(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Add New Mission
          </DialogTitle>
          <DialogDescription>
            Enter the key details for the new mission. Full details can be added after creation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <div className="col-span-3">
              <Input id="name" {...register("name")} className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <div className="col-span-3">
              <Textarea id="description" {...register("description")} className={errors.description ? "border-destructive" : ""} />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="launchDate" className="text-right">Launch Date</Label>
            <div className="col-span-3">
              <Input id="launchDate" type="date" {...register("launchDate")} className={errors.launchDate ? "border-destructive" : ""} />
              {errors.launchDate && <p className="text-xs text-destructive mt-1">{errors.launchDate.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agencyId" className="text-right">Agency</Label>
            <div className="col-span-3">
               <Select 
                onValueChange={(value) => setValue("agencyId", value, { shouldValidate: true })}
                value={watch("agencyId")}
              >
                <SelectTrigger id="agencyId" className={errors.agencyId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select Agency" />
                </SelectTrigger>
                <SelectContent>
                  {agencies.map(agency => <SelectItem key={agency.id} value={agency.id}>{agency.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.agencyId && <p className="text-xs text-destructive mt-1">{errors.agencyId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="missionTypeId" className="text-right">Type</Label>
             <div className="col-span-3">
              <Select 
                onValueChange={(value) => setValue("missionTypeId", value, { shouldValidate: true })}
                value={watch("missionTypeId")}
              >
                <SelectTrigger id="missionTypeId" className={errors.missionTypeId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {missionTypes.map(type => <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.missionTypeId && <p className="text-xs text-destructive mt-1">{errors.missionTypeId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetDestination" className="text-right">Target</Label>
            <div className="col-span-3">
              <Input id="targetDestination" {...register("targetDestination")} className={errors.targetDestination ? "border-destructive" : ""} />
              {errors.targetDestination && <p className="text-xs text-destructive mt-1">{errors.targetDestination.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <div className="col-span-3">
              <Select
                onValueChange={(value: Mission['status']) => setValue("status", value, { shouldValidate: true })}
                value={watch("status")}
              >
                <SelectTrigger id="status" className={errors.status ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {missionStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && <p className="text-xs text-destructive mt-1">{errors.status.message}</p>}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">Add Mission</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
