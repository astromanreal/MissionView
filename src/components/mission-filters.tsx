
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Agency, MissionType, Mission } from "@/types/mission"; // Added Mission

interface MissionFiltersProps {
  years: number[];
  missionTypes: MissionType[];
  agencies: Agency[];
  destinations: string[];
  missionStatuses: Mission['status'][];
  onFilterChange: (filters: { 
    year?: string | null; 
    typeId?: string | null; 
    agencyId?: string | null;
    status?: Mission['status'] | null;
    destination?: string | null;
    minDurationDays?: number | null;
    maxDurationDays?: number | null;
  }) => void;
  currentFilters: { 
    year: string | null; 
    typeId: string | null; 
    agencyId: string | null;
    status: Mission['status'] | null;
    destination: string | null;
    minDurationDays: number | null;
    maxDurationDays: number | null;
  };
}

export function MissionFilters({ 
  years, 
  missionTypes, 
  agencies, 
  destinations,
  missionStatuses,
  onFilterChange, 
  currentFilters 
}: MissionFiltersProps) {
  
  const handleSelectChange = (key: string, value: string) => {
    onFilterChange({ [key]: value === "all" ? null : value });
  };

  const handleInputChange = (key: string, value: string) => {
    const numValue = parseInt(value, 10);
    onFilterChange({ [key]: isNaN(numValue) ? null : numValue });
  };


  return (
    <Card className="mb-8 shadow-md border-border/70">
      <CardHeader>
        <CardTitle className="text-lg">Filter Missions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="year-filter" className="mb-1 block text-sm font-medium">Launch Year</Label>
            <Select onValueChange={(value) => handleSelectChange('year', value)} value={currentFilters.year || "all"}>
              <SelectTrigger id="year-filter" className="w-full">
                <SelectValue placeholder="Any Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Year</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="type-filter" className="mb-1 block text-sm font-medium">Mission Type</Label>
            <Select onValueChange={(value) => handleSelectChange('typeId', value)} value={currentFilters.typeId || "all"}>
              <SelectTrigger id="type-filter" className="w-full">
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                {missionTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="agency-filter" className="mb-1 block text-sm font-medium">Agency</Label>
            <Select onValueChange={(value) => handleSelectChange('agencyId', value)} value={currentFilters.agencyId || "all"}>
              <SelectTrigger id="agency-filter" className="w-full">
                <SelectValue placeholder="Any Agency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Agency</SelectItem>
                {agencies.map(agency => (
                  <SelectItem key={agency.id} value={agency.id}>{agency.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status-filter" className="mb-1 block text-sm font-medium">Status</Label>
            <Select onValueChange={(value) => handleSelectChange('status', value)} value={currentFilters.status || "all"}>
              <SelectTrigger id="status-filter" className="w-full">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                {missionStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="destination-filter" className="mb-1 block text-sm font-medium">Destination</Label>
            <Select onValueChange={(value) => handleSelectChange('destination', value)} value={currentFilters.destination || "all"}>
              <SelectTrigger id="destination-filter" className="w-full">
                <SelectValue placeholder="Any Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Destination</SelectItem>
                {destinations.map(dest => (
                  <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="min-duration-filter" className="mb-1 block text-sm font-medium">Min Duration (days)</Label>
                <Input 
                    id="min-duration-filter"
                    type="number" 
                    placeholder="e.g. 30"
                    value={currentFilters.minDurationDays?.toString() || ""}
                    onChange={(e) => handleInputChange('minDurationDays', e.target.value)}
                    className="w-full"
                    min="0"
                />
            </div>
            <div>
                <Label htmlFor="max-duration-filter" className="mb-1 block text-sm font-medium">Max Duration (days)</Label>
                <Input 
                    id="max-duration-filter"
                    type="number" 
                    placeholder="e.g. 365"
                    value={currentFilters.maxDurationDays?.toString() || ""}
                    onChange={(e) => handleInputChange('maxDurationDays', e.target.value)}
                    className="w-full"
                    min={currentFilters.minDurationDays || 0}
                />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
