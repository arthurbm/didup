"use client";

import { type Task } from "@doist/todoist-api-typescript"; // Assuming Task type will be imported or defined

interface ActivitySummaryProps {
  tasks: Task[] | null; // Or a more specific type for your simplified task data
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
    return <p>Loading tasks...</p>;
  }

  if (tasksError) {
    return <p>Error loading tasks: {tasksError.message}</p>;
  }

  return (
    <div className="space-y-6">
      {tasks && tasks.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Your Tasks</h2>
          <ul className="list-inside list-disc space-y-1">
            {tasks.map((task) => (
              <li key={task.id}>{task.content}</li>
            ))}
          </ul>
        </div>
      )}
      {tasks && tasks.length === 0 && !isLoadingTasks && (
        <p>No tasks found for the selected period.</p>
      )}

      {isLoadingSummary && <p>Generating summary...</p>}
      {summaryError && <p>Error generating summary: {summaryError.message}</p>}
      {summary && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">AI Summary</h2>
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}
