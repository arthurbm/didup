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
          size="sm"
          className={cn(
            "h-9 rounded-md text-sm font-normal",
            selectedFilter === "today"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-border/50 bg-card/30 text-foreground hover:bg-accent/50",
          )}
        >
          Today
        </Button>
        <Button
          variant={selectedFilter === "next7days" ? "default" : "outline"}
          onClick={() => handlePresetClick("next7days")}
          disabled={disabled}
          size="sm"
          className={cn(
            "h-9 rounded-md text-sm font-normal",
            selectedFilter === "next7days"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-border/50 bg-card/30 text-foreground hover:bg-accent/50",
          )}
        >
          Next 7 Days
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={selectedFilter === "custom" ? "default" : "outline"}
              size="sm"
              className={cn(
                "ml-auto h-9 min-w-[220px] justify-start rounded-md text-sm font-normal",
                selectedFilter === "custom"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border/50 bg-card/30 text-foreground hover:bg-accent/50",
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
                <span>Custom range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-border/50 w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={disabled}
              className="bg-popover"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
