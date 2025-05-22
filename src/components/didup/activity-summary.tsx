"use client";

import { type Task } from "@doist/todoist-api-typescript";
import { format, parseISO, isValid } from "date-fns";

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
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent" />
          <p className="font-medium text-blue-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
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

          // Use nullish coalescing assignment to initialize array if needed
          groups[dateKey] ??= [];
          groups[dateKey].push(task);
          return groups;
        }, {})
      : {};

  const hasGroups = Object.keys(groupedTasks).length > 0;

  return (
    <div className="space-y-8">
      {/* Tasks Section */}
      {hasGroups ? (
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Your Tasks
          </h2>
          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([dateGroup, taskList]) => (
              <div key={dateGroup} className="space-y-2">
                <h3 className="border-b border-indigo-200 pb-1 text-lg font-medium text-indigo-700">
                  {dateGroup}
                </h3>
                <ul className="space-y-2">
                  {taskList.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-start rounded-md p-2 transition-colors hover:bg-slate-50"
                    >
                      <div className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0">
                        <div
                          className={`h-4 w-4 rounded-full border-2 ${getPriorityColor(task.priority)}`}
                        ></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium break-words text-gray-800">
                          {task.content}
                        </p>
                        {task.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {task.description}
                          </p>
                        )}
                        {task.labels && task.labels.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {task.labels.map((label) => (
                              <span
                                key={label}
                                className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
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
          <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4 text-yellow-800">
            <p>No tasks found for the selected period.</p>
          </div>
        )
      )}

      {/* AI Summary Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          AI Summary
        </h2>

        {isLoadingSummary && (
          <div className="h-32 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
              <span className="ml-2 text-blue-600">
                Generating your summary...
              </span>
            </div>
          </div>
        )}

        {summaryError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <p>Error generating summary: {summaryError.message}</p>
          </div>
        )}

        {summary && !isLoadingSummary && (
          <div className="rounded-lg border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 shadow-sm">
            <p className="leading-relaxed whitespace-pre-wrap text-gray-800">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get color based on task priority
function getPriorityColor(priority: number): string {
  switch (priority) {
    case 4: // Highest
      return "border-red-600";
    case 3:
      return "border-orange-500";
    case 2:
      return "border-blue-500";
    case 1:
    default:
      return "border-gray-400";
  }
}
