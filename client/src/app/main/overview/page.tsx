"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Title from "@/app/components/Title";
import OverviewChart from "@/app/components/OverviewChart";

// Define the view types
type ViewType = "sales" | "units";

const Overview: React.FC = () => {
  const [view, setView] = useState<ViewType>("units");

  return (
    <div className="px-10 py-6">
      <Title
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />

      <div className="h-[75vh] space-y-6">
        <div className="mt-4 max-w-xs">
          <Label htmlFor="view">View</Label>
          <Select value={view} onValueChange={(val: ViewType) => setView(val)}>
            <SelectTrigger id="view">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="units">Units</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <OverviewChart view={view} />
      </div>
    </div>
  );
};

export default Overview;
