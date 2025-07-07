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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Agency, AgencyFormData } from "@/types/mission";
import { agencyFormSchema } from "@/types/mission";
import { useEffect } from "react";

interface AddEditAgencyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: AgencyFormData) => void;
  agencyToEdit?: Agency | null;
}

export function AddEditAgencyDialog({
  isOpen,
  onOpenChange,
  onSave,
  agencyToEdit,
}: AddEditAgencyDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgencyFormData>({
    resolver: zodResolver(agencyFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (agencyToEdit) {
        reset({
          ...agencyToEdit,
          country: agencyToEdit.country || "",
        });
      } else {
        reset({
          id: undefined,
          name: "",
          country: "",
        });
      }
    }
  }, [isOpen, agencyToEdit, reset]);

  const onSubmit = (data: AgencyFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {agencyToEdit ? "Edit Agency" : "Add New Agency"}
          </DialogTitle>
          <DialogDescription>
            {agencyToEdit ? "Update the details of the agency." : "Enter the details for the new agency."}
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
            <Label htmlFor="country" className="text-right">Country (Optional)</Label>
            <div className="col-span-3">
              <Input id="country" {...register("country")} className={errors.country ? "border-destructive" : ""} />
              {errors.country && <p className="text-xs text-destructive mt-1">{errors.country.message}</p>}
            </div>
          </div>
          
          {/* Placeholder for logo upload/management - future enhancement */}
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">Logo URL (Optional)</Label>
            <div className="col-span-3">
              <Input id="logo" {...register("logo")} placeholder="https://example.com/logo.png" />
            </div>
          </div> */}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">Save Agency</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
