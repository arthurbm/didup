"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfDay,
  endOfDay,
  isToday,
  startOfToday,
  endOfToday,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type TaskFilter = "today" | "next7days" | "custom";

export interface TaskDateRange {
  from: Date;
  to?: Date;
}

interface DateRangeSelectorProps {
  selectedFilter: TaskFilter | null;
  onSelectFilter: (filter: TaskFilter, dateRange?: TaskDateRange) => void;
  dateRange?: TaskDateRange;
  disabled?: boolean;
}

export function DateRangeSelector({
  selectedFilter,
  onSelectFilter,
  dateRange,
  disabled,
}: DateRangeSelectorProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    dateRange
      ? { from: dateRange.from, to: dateRange.to }
      : {
          from: startOfDay(new Date()),
          to: endOfDay(new Date()),
        },
  );

  const handlePresetClick = (filter: TaskFilter) => {
    let newDateRange: TaskDateRange;

    if (filter === "today") {
      newDateRange = {
        from: startOfToday(),
        to: endOfToday(),
      };
    } else if (filter === "next7days") {
      newDateRange = {
        from: startOfToday(),
        to: endOfDay(addDays(new Date(), 6)),
      };
    } else {
      // Default to today
      newDateRange = {
        from: startOfToday(),
        to: endOfToday(),
      };
    }

    setDate({ from: newDateRange.from, to: newDateRange.to });
    onSelectFilter(filter, newDateRange);
  };

  const handleDateSelect = (selectedDateRange: DateRange | undefined) => {
    if (selectedDateRange?.from) {
      setDate(selectedDateRange);
      const taskDateRange: TaskDateRange = {
        from: selectedDateRange.from,
        to: selectedDateRange.to,
      };
      onSelectFilter("custom", taskDateRange);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedFilter === "today" ? "default" : "outline"}
          onClick={() => handlePresetClick("today")}
          disabled={disabled}
          className="px-4"
        >
          Today
        </Button>
        <Button
          variant={selectedFilter === "next7days" ? "default" : "outline"}
          onClick={() => handlePresetClick("next7days")}
          disabled={disabled}
          className="px-4"
        >
          Next 7 Days
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={selectedFilter === "custom" ? "default" : "outline"}
              className={cn(
                "min-w-[240px] justify-start text-left",
                !date && "text-muted-foreground",
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "MMM dd, yyyy")} -{" "}
                    {format(date.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(date.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
