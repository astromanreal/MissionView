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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MissionType, MissionTypeFormData } from "@/types/mission";
import { missionTypeFormSchema } from "@/types/mission";
import { useEffect } from "react";

interface AddEditMissionTypeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: MissionTypeFormData) => void;
  missionTypeToEdit?: MissionType | null;
}

export function AddEditMissionTypeDialog({
  isOpen,
  onOpenChange,
  onSave,
  missionTypeToEdit,
}: AddEditMissionTypeDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MissionTypeFormData>({
    resolver: zodResolver(missionTypeFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (missionTypeToEdit) {
        reset({
          ...missionTypeToEdit,
          description: missionTypeToEdit.description || "",
        });
      } else {
        reset({
          id: undefined,
          name: "",
          description: "",
        });
      }
    }
  }, [isOpen, missionTypeToEdit, reset]);

  const onSubmit = (data: MissionTypeFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {missionTypeToEdit ? "Edit Mission Type" : "Add New Mission Type"}
          </DialogTitle>
          <DialogDescription>
            {missionTypeToEdit ? "Update the details of the mission type." : "Enter the details for the new mission type."}
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
            <Label htmlFor="description" className="text-right">Description (Optional)</Label>
            <div className="col-span-3">
              <Textarea id="description" {...register("description")} className={errors.description ? "border-destructive" : ""} />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
            </div>
          </div>

          {/* Icon selection could be a future enhancement, e.g. dropdown with Lucide icon names */}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">Save Mission Type</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
