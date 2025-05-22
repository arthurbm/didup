"use client";

import { type Task } from "@doist/todoist-api-typescript";
import { format, parseISO, isValid } from "date-fns";
import { CheckCircle2, Loader2 } from "lucide-react";

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
        <div className="flex animate-pulse flex-col items-center gap-4">
          <div className="border-t-primary border-b-primary h-12 w-12 animate-spin rounded-full border-4 border-r-transparent border-l-transparent" />
          <p className="text-primary font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="bg-destructive/10 border-destructive/30 text-destructive rounded-lg border p-4">
        <h3 className="mb-2 text-lg font-semibold">Error Loading Tasks</h3>
        <p>{tasksError.message}</p>
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
    <div className="space-y-8">
      {/* Tasks Section */}
      {hasGroups ? (
        <div>
          <h2 className="text-foreground mb-4 text-2xl font-semibold">
            Your Tasks
          </h2>
          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([dateGroup, taskList]) => (
              <div key={dateGroup} className="space-y-2">
                <h3 className="text-primary border-border border-b pb-1 text-lg font-medium">
                  {dateGroup}
                </h3>
                <ul className="space-y-2">
                  {taskList.map((task) => (
                    <li
                      key={task.id}
                      className="hover:bg-accent flex items-start rounded-md p-2 transition-colors"
                    >
                      <div className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0">
                        <div
                          className={`h-4 w-4 rounded-full border-2 ${getPriorityBorderClass(task.priority)}`}
                        ></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground font-medium break-words">
                          {task.content}
                        </p>
                        {task.description && (
                          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                            {task.description}
                          </p>
                        )}
                        {task.labels && task.labels.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {task.labels.map((label) => (
                              <span
                                key={label}
                                className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs"
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
          <div className="bg-accent border-border text-muted-foreground rounded-lg border p-4">
            <p>No tasks found for the selected period.</p>
          </div>
        )
      )}

      {/* AI Summary Section */}
      <div className="mt-8">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          AI Summary
        </h2>

        {isLoadingSummary && (
          <div className="bg-accent border-border h-32 rounded-lg border p-6">
            <div className="flex items-center gap-1">
              <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
              <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
              <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
              <span className="text-primary ml-2">
                Generating your summary...
              </span>
            </div>
          </div>
        )}

        {summaryError && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive rounded-lg border p-4">
            <p>Error generating summary: {summaryError.message}</p>
          </div>
        )}

        {summary && !isLoadingSummary && (
          <div className="bg-card border-border rounded-lg border p-6 shadow-sm">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
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
