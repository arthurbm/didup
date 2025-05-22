"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TaskFilter = "today" | "next7days";

interface DateRangeSelectorProps {
  selectedFilter: TaskFilter | null;
  onSelectFilter: (filter: TaskFilter) => void;
  disabled?: boolean;
}

const filters: { label: string; value: TaskFilter }[] = [
  { label: "Today", value: "today" },
  { label: "Next 7 Days", value: "next7days" },
];

export function DateRangeSelector({
  selectedFilter,
  onSelectFilter,
  disabled,
}: DateRangeSelectorProps) {
  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedFilter === filter.value ? "default" : "outline"}
          onClick={() => onSelectFilter(filter.value)}
          disabled={disabled}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
