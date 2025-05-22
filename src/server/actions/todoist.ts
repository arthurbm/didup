'use server';

import { TodoistApi, type Task } from "@doist/todoist-api-typescript";
import { format } from "date-fns";
import { type TaskDateRange } from "@/components/didup/date-range-selector";

export async function getTodoistTasks(
  apiKey: string,
  filterName: string,
  dateRange?: TaskDateRange
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

    // If dateRange is provided and it's a custom filter, use it for date-based filtering
    if (filterName === "custom" && dateRange?.from) {
      const fromDate = format(dateRange.from, "yyyy-MM-dd");
      const queryParts = [];
      
      // Para data personalizada, usamos "due after:" e "due before:" conforme documentação
      if (dateRange.to) {
        // Se tem data fim, busca tarefas entre as datas
        const toDate = format(dateRange.to, "yyyy-MM-dd");
        queryParts.push(`due after: ${fromDate}`);
        queryParts.push(`due before: ${toDate}`);
      } else {
        // Se não tem data fim, busca tarefas apenas do dia específico
        queryParts.push(`due: ${fromDate}`);
      }
      
      todoistFilterQuery = queryParts.join(" & ");
    } else {
      // Use predefined filters according to Todoist documentation
      switch (filterName) {
        case "today":
          todoistFilterQuery = "today | overdue";
          break;
        case "next7days":
          // Corrigido: usar +8 days para incluir os próximos 7 dias completos
          todoistFilterQuery = "due before: +8 days";
          break;
        default:
          throw new Error(`Unsupported filter: ${filterName}`);
      }
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