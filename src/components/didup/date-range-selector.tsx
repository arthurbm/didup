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
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-foreground text-sm font-medium">Quick Select</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant={selectedFilter === "today" ? "default" : "outline"}
            onClick={() => handlePresetClick("today")}
            disabled={disabled}
            size="sm"
            className={cn(
              "flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium",
              selectedFilter === "today"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border/50 bg-card/30 text-foreground hover:bg-accent/50",
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            Today
          </Button>
          <Button
            variant={selectedFilter === "next7days" ? "default" : "outline"}
            onClick={() => handlePresetClick("next7days")}
            disabled={disabled}
            size="sm"
            className={cn(
              "flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium",
              selectedFilter === "next7days"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border/50 bg-card/30 text-foreground hover:bg-accent/50",
            )}
          >
            <ArrowRight className="h-3.5 w-3.5" />
            Next 7 Days
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-foreground text-sm font-medium">Custom Range</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={selectedFilter === "custom" ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-10 w-full justify-start rounded-full px-5 text-sm font-medium",
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
                <span>Select custom date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="border-border/50 w-auto p-0"
            align="center"
            sideOffset={8}
          >
            <div className="bg-card/50 border-border/30 border-b p-3">
              <h4 className="text-foreground text-sm font-medium">
                Select Date Range
              </h4>
            </div>
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
