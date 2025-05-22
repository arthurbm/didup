'use server';

import { TodoistApi, type Task } from "@doist/todoist-api-typescript";

export async function getTodoistTasks(
  apiKey: string,
  filterName: string // Renamed to avoid confusion with SDK's filter property
): Promise<Task[]> {
  if (!apiKey) {
    throw new Error("Todoist API key is required.");
  }
  if (!filterName) {
    throw new Error("A filter selection (e.g., 'today') is required.");
  }

  try {
    const api = new TodoistApi(apiKey);
    let todoistFilterQuery: string;

    switch (filterName) {
      case "today":
        todoistFilterQuery = "today | overdue";
        break;
      case "next7days":
        // As per Todoist documentation for filters:
        // "due before: +X days" (e.g. due before: +7 days)
        // "due after: +X days" (e.g. due after: +7 days)
        todoistFilterQuery = "due before: +7 days";
        break;
      default:
        throw new Error(`Unsupported filter: ${filterName}`);
    }

    const tasks = await api.getTasksByFilter({
      query: todoistFilterQuery,
    });
    return tasks.results;

  } catch (error) {
    console.error("[Todoist Action Error] Failed to fetch tasks:", error);
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        // Todoist API typically returns 401 for auth issues.
        throw new Error("Invalid Todoist API key. Please check your key and try again.");
      }
      // Re-throw other errors with a generic message or the original message for debugging.
      throw new Error(`Failed to fetch tasks from Todoist: ${error.message}`);
    }
    // Fallback for non-Error objects thrown
    throw new Error("An unknown error occurred while fetching tasks from Todoist.");
  }
} 