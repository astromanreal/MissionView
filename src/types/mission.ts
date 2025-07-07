import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export interface Agency {
  id: string;
  name: string;
  logo?: string; 
  country?: string; 
}

export interface MissionType {
  id: string;
  name:string;
  icon?: LucideIcon | string; 
  description?: string; 
}

export interface Target {
  body: string;
  region?: string;
  system?: string;
}

export interface Spacecraft {
  name: string;
  type: string;
  features: string[];
}

export interface Instrument {
  name: string;
  function: string;
}

export interface ScienceReturn {
  expected_outcomes: string[];
}

export interface Links {
  official_site?: string;
  press_release?: string;
}

export interface Mission {
  id: string; 
  name: string; 
  description: string;
  agencyId: string;
  missionTypeId: string;
  launchDate: string; // ISO string
  endDate?: string; // ISO string
  status: 'Planned' | 'Ongoing' | 'Completed' | 'Failed';
  
  target: Target;
  objectives: string[];
  spacecraft: Spacecraft;
  instruments: Instrument[];
  launch_vehicle: string;
  duration: string;
  science_return: ScienceReturn;
  links: Links;
  
  targetDestination: string; 
  imageUrl: string; 
  events: []; 
}


export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  content: Record<string, any>;
}

export const addMissionFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  launchDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), { message: "Invalid launch date." }),
  agencyId: z.string().min(1, { message: "Agency must be selected." }),
  missionTypeId: z.string().min(1, { message: "Mission type must be selected." }),
  targetDestination: z.string().min(2, { message: "Target destination must be at least 2 characters." }),
  status: z.enum(['Planned', 'Ongoing', 'Completed', 'Failed'], { message: "Invalid status." }),
});

export type AddMissionFormData = z.infer<typeof addMissionFormSchema>;

export const editMissionFormSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  launchDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), { message: "Invalid launch date." }),
  endDate: z.string().optional(),
  agencyId: z.string().min(1, { message: "Agency must be selected." }),
  missionTypeId: z.string().min(1, { message: "Mission type must be selected." }),
  status: z.enum(['Planned', 'Ongoing', 'Completed', 'Failed']),
  
  targetDestination: z.string().min(2, { message: "Target destination must be at least 2 characters." }),
  duration: z.string().min(1, "Duration is required."),
  launch_vehicle: z.string().min(1, "Launch vehicle is required."),
  
  imageUrl: z.string().url({ message: "Must be a valid URL." }).or(z.literal('')),

  objectives: z.array(z.object({ value: z.string().min(1, "Objective cannot be empty.") })),
  
  spacecraft: z.object({
    name: z.string().min(1, "Spacecraft name is required."),
    type: z.string().min(1, "Spacecraft type is required."),
    features: z.array(z.object({ value: z.string().min(1, "Feature cannot be empty.") })),
  }),

  instruments: z.array(z.object({
    name: z.string().min(1, "Instrument name cannot be empty."),
    function: z.string().min(1, "Instrument function cannot be empty."),
  })),

  science_return: z.object({
    expected_outcomes: z.array(z.object({ value: z.string().min(1, "Outcome cannot be empty.") })),
  }),

  links: z.object({
    official_site: z.string().url().or(z.literal('')).optional(),
    press_release: z.string().url().or(z.literal('')).optional(),
  }),
});

export type EditMissionFormData = z.infer<typeof editMissionFormSchema>;


export const agencyFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Agency name must be at least 2 characters." }).max(100),
  country: z.string().min(2, { message: "Country name must be at least 2 characters." }).max(50).optional(),
});
export type AgencyFormData = z.infer<typeof agencyFormSchema>;


export const missionTypeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Type name must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500).optional(),
});
export type MissionTypeFormData = z.infer<typeof missionTypeFormSchema>;
