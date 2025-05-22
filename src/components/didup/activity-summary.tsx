"use client";

import { type Task } from "@doist/todoist-api-typescript";
import { format, parseISO, isValid } from "date-fns";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

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
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm">Loading your tasks...</p>
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
    <div className="space-y-10">
      {/* Tasks Section */}
      {hasGroups ? (
        <div>
          <h2 className="text-foreground mb-6 text-xl font-medium">
            Your Tasks
          </h2>
          <div className="space-y-8">
            {Object.entries(groupedTasks).map(([dateGroup, taskList]) => (
              <div key={dateGroup} className="space-y-2">
                <div className="mb-3 flex items-center gap-2">
                  <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                  <h3 className="text-foreground font-medium">{dateGroup}</h3>
                </div>
                <ul className="space-y-3 pl-2">
                  {taskList.map((task) => (
                    <li
                      key={task.id}
                      className="hover:bg-accent/50 flex items-start gap-3 rounded-md p-2.5 transition-colors"
                    >
                      <div
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 ${getPriorityBorderClass(task.priority)}`}
                      ></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground text-sm font-medium">
                          {task.content}
                        </p>
                        {task.description && (
                          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                            {task.description}
                          </p>
                        )}
                        {task.labels && task.labels.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {task.labels.map((label) => (
                              <span
                                key={label}
                                className="bg-secondary/30 text-secondary-foreground rounded-sm px-1.5 py-0.5 text-[10px]"
                              >
                                {label}
                              </span>
                            ))}
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
          <div className="border-border bg-accent/50 flex items-center gap-3 rounded-lg border p-4">
            <div className="text-muted-foreground text-sm">
              No tasks found for the selected period.
            </div>
          </div>
        )
      )}

      {/* AI Summary Section */}
      <div>
        <h2 className="text-foreground mb-6 text-xl font-medium">AI Summary</h2>

        {isLoadingSummary && (
          <div className="border-border flex min-h-24 items-center justify-center rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="bg-primary/20 absolute h-2.5 w-2.5 animate-ping rounded-full"></div>
                <div className="bg-primary relative h-2.5 w-2.5 rounded-full"></div>
              </div>
              <span className="text-muted-foreground text-sm">
                Generating your summary...
              </span>
            </div>
          </div>
        )}

        {summaryError && (
          <div className="border-destructive/30 bg-destructive/5 flex items-start gap-3 rounded-lg border p-4">
            <AlertCircle className="text-destructive mt-0.5 h-5 w-5" />
            <div>
              <h3 className="text-destructive font-medium">
                Error Generating Summary
              </h3>
              <p className="text-destructive/80 mt-1 text-sm">
                {summaryError.message}
              </p>
            </div>
          </div>
        )}

        {summary && !isLoadingSummary && (
          <div className="border-border bg-card/50 rounded-lg border p-6">
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
