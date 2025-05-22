"use client";

import { type Task } from "@doist/todoist-api-typescript";
import { format, parseISO, isValid } from "date-fns";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  BookOpen,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";

interface ActivitySummaryProps {
  tasks: Task[] | null;
  summary: string | null;
  isLoadingTasks: boolean;
  isLoadingSummary: boolean;
  tasksError: Error | null;
  summaryError: Error | null;
}

export function ActivitySummary({
  tasks,
  summary,
  isLoadingTasks,
  isLoadingSummary,
  tasksError,
  summaryError,
}: ActivitySummaryProps) {
  if (isLoadingTasks) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="bg-primary/20 absolute h-8 w-8 animate-ping rounded-full"></div>
            <Loader2 className="text-primary relative h-8 w-8 animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm">
            Loading your accomplishments...
          </p>
        </div>
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="border-destructive/30 bg-destructive/5 flex items-start gap-3 rounded-lg border p-4">
        <AlertCircle className="text-destructive mt-0.5 h-5 w-5" />
        <div>
          <h3 className="text-destructive font-medium">Error Loading Tasks</h3>
          <p className="text-destructive/80 mt-1 text-sm">
            {tasksError.message}
          </p>
        </div>
      </div>
    );
  }

  // Group tasks by due date for better organization
  const groupedTasks =
    tasks && tasks.length > 0
      ? tasks.reduce<Record<string, Task[]>>((groups, task) => {
          // Default to "No Due Date" if due is undefined
          let dateKey = "No Due Date";

          // Only try to parse date if task.due exists and has a date property
          if (task.due?.date) {
            try {
              const dueDate = parseISO(task.due.date);
              if (isValid(dueDate)) {
                dateKey = format(dueDate, "MMM dd, yyyy");
              } else if (task.due?.string) {
                // Fallback to the string representation if parsing fails
                dateKey = task.due.string;
              }
            } catch (e) {
              // If parsing fails completely, use a fallback value
              dateKey = "Invalid Date";
              // Try to use the string property if it exists
              if (task.due && typeof task.due.string === "string") {
                dateKey = task.due.string;
              }
            }
          }

          // Initialize the array if it doesn't exist using nullish coalescing
          // This is a safer approach than the previous one
          if (groups) {
            groups[dateKey] = groups[dateKey] ?? [];
            // Now we know for sure groups[dateKey] exists
            groups[dateKey]?.push(task);
          }
          return groups;
        }, {})
      : {};

  const hasGroups = Object.keys(groupedTasks).length > 0;

  return (
    <div className="space-y-12">
      {/* Tasks Section */}
      {hasGroups ? (
        <div>
          <h2 className="text-foreground mb-8 flex items-center gap-2 text-2xl font-bold">
            <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            Your Accomplishments
          </h2>
          <div className="space-y-10">
            {Object.entries(groupedTasks).map(([dateGroup, taskList]) => (
              <div key={dateGroup} className="space-y-4">
                <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                  <Calendar className="text-primary h-4 w-4" />
                  <h3 className="text-foreground font-medium">{dateGroup}</h3>
                </div>
                <ul className="space-y-4 pl-2">
                  {taskList.map((task) => (
                    <li
                      key={task.id}
                      className="hover:bg-accent/50 group hover:border-border/30 flex items-start gap-3 rounded-lg border border-transparent p-3 transition-all"
                    >
                      <div
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 ${getPriorityBorderClass(task.priority)}`}
                      ></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground text-sm font-medium">
                          {task.content}
                        </p>
                        {task.description && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <FileText className="text-muted-foreground mt-0.5 h-3.5 w-3.5" />
                            <p className="text-muted-foreground line-clamp-2 text-xs">
                              {task.description}
                            </p>
                          </div>
                        )}
                        {task.labels && task.labels.length > 0 && (
                          <div className="mt-3 flex items-center gap-2">
                            <Tag className="text-muted-foreground h-3 w-3" />
                            <div className="flex flex-wrap gap-1.5">
                              {task.labels.map((label) => (
                                <span
                                  key={label}
                                  className="bg-secondary/30 text-secondary-foreground rounded-full px-2 py-0.5 text-[10px]"
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !isLoadingTasks && (
          <div className="border-border bg-accent/50 flex items-center gap-3 rounded-lg border p-6 text-center">
            <div className="text-muted-foreground mx-auto max-w-sm">
              <p className="mb-2 text-sm">
                No tasks found for the selected period.
              </p>
              <p className="text-xs">
                Try selecting a different date range to see your
                accomplishments.
              </p>
            </div>
          </div>
        )
      )}

      {/* AI Summary Section */}
      <div>
        <h2 className="text-foreground mb-8 flex items-center gap-2 text-2xl font-bold">
          <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
            <BookOpen className="h-4 w-4" />
          </span>
          Your Reflection
        </h2>

        {isLoadingSummary && (
          <div className="border-border/30 bg-card/30 flex min-h-32 items-center justify-center rounded-lg border p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="bg-primary/20 absolute h-3 w-3 animate-ping rounded-full"></div>
                <div className="bg-primary relative h-3 w-3 rounded-full"></div>
              </div>
              <span className="text-muted-foreground text-sm">
                Creating your reflection...
              </span>
            </div>
          </div>
        )}

        {summaryError && (
          <div className="border-destructive/30 bg-destructive/5 flex items-start gap-3 rounded-lg border p-4">
            <AlertCircle className="text-destructive mt-0.5 h-5 w-5" />
            <div>
              <h3 className="text-destructive font-medium">
                Error Creating Reflection
              </h3>
              <p className="text-destructive/80 mt-1 text-sm">
                {summaryError.message}
              </p>
            </div>
          </div>
        )}

        {summary && !isLoadingSummary && (
          <div className="border-border/30 bg-card/30 from-primary/5 rounded-lg border bg-gradient-to-b to-transparent p-6 md:p-8">
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get border color class based on task priority
function getPriorityBorderClass(priority: number): string {
  switch (priority) {
    case 4: // Highest
      return "border-destructive";
    case 3:
      return "border-primary";
    case 2:
      return "border-secondary";
    case 1:
    default:
      return "border-muted";
  }
}
