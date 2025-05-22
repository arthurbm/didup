"use client";

import { useCompletion } from "@ai-sdk/react";
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { type Task } from "@doist/todoist-api-typescript";

import {
  ApiKeyForm,
  type ApiKeyFormData,
} from "@/components/didup/api-key-form";
import {
  DateRangeSelector,
  type TaskFilter,
} from "@/components/didup/date-range-selector";
import { ActivitySummary } from "@/components/didup/activity-summary";
import { getTodoistTasks } from "@/server/actions/todoist";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function HomePage() {
  const queryClient = useQueryClient();
  const [todoistApiKey, setTodoistApiKey] = useState<string | null>(null);
  const [selectedTaskFilter, setSelectedTaskFilter] =
    useState<TaskFilter | null>(null);
  const [showApiKeyForm, setShowApiKeyForm] = useState<boolean>(true);

  const todoistTasksQuery: UseQueryResult<Task[] | null, Error> = useQuery<
    Task[] | null,
    Error,
    Task[] | null,
    [string, string | null, TaskFilter | null]
  >({
    queryKey: ["todoistTasks", todoistApiKey, selectedTaskFilter],
    queryFn: async () => {
      if (!todoistApiKey || !selectedTaskFilter) {
        return null;
      }
      return getTodoistTasks(todoistApiKey, selectedTaskFilter);
    },
    enabled: !!todoistApiKey && !!selectedTaskFilter && !showApiKeyForm,
    // staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      if (error?.message?.includes("Invalid Todoist API key")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const {
    completion,
    complete,
    isLoading: isLoadingSummary,
    error: summaryError,
    stop,
  } = useCompletion({
    api: "/api/ai/summarize",
  });

  const handleApiKeySubmit = (data: ApiKeyFormData) => {
    setTodoistApiKey(data.apiKey);
    setShowApiKeyForm(false);
    if (!selectedTaskFilter) {
      setSelectedTaskFilter("today");
    } else {
      void queryClient.invalidateQueries({
        queryKey: ["todoistTasks", data.apiKey, selectedTaskFilter],
      });
    }
  };

  const handleFilterSelect = (filter: TaskFilter) => {
    setSelectedTaskFilter(filter);
    if (todoistApiKey) {
      void queryClient.invalidateQueries({
        queryKey: ["todoistTasks", todoistApiKey, filter],
      });
    }
  };

  useEffect(() => {
    const tasks = todoistTasksQuery.data;
    if (
      tasks &&
      Array.isArray(tasks) &&
      tasks.length > 0 &&
      !isLoadingSummary
    ) {
      const requestBody = { tasks };
      void complete("", { body: requestBody });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoistTasksQuery.data, complete]);

  const handleResetAndChangeKey = () => {
    setTodoistApiKey(null);
    setSelectedTaskFilter(null);
    setShowApiKeyForm(true);
    if (isLoadingSummary) {
      stop();
    }
    void queryClient.removeQueries({ queryKey: ["todoistTasks"] });
  };

  const tasksData = todoistTasksQuery.data;
  const tasksLoading = todoistTasksQuery.isFetching;
  const tasksErrorData = todoistTasksQuery.error ?? null;

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-3xl overflow-hidden rounded-lg shadow-xl">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 text-center text-white">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Didup
          </CardTitle>
          <CardDescription className="mt-1 text-xl text-sky-100">
            Your AI-Powered Productivity Reviewer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6 md:p-8">
          {showApiKeyForm || !todoistApiKey ? (
            <section aria-labelledby="api-key-section">
              <h2
                id="api-key-section"
                className="mb-3 text-xl font-semibold text-gray-700"
              >
                Connect to Todoist
              </h2>
              <ApiKeyForm
                onSubmit={handleApiKeySubmit}
                isLoading={
                  tasksLoading && todoistTasksQuery.fetchStatus !== "idle"
                }
              />
            </section>
          ) : (
            <section aria-labelledby="controls-section" className="space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 rounded-md bg-slate-100 p-4 sm:flex-row sm:items-center">
                <div>
                  <h2
                    id="controls-section"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Todoist Connected
                  </h2>
                  <p className="text-sm text-gray-500">
                    Select a period to review your tasks.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetAndChangeKey}
                  className="shrink-0"
                >
                  Change API Key
                </Button>
              </div>
              <DateRangeSelector
                selectedFilter={selectedTaskFilter}
                onSelectFilter={handleFilterSelect}
                disabled={tasksLoading || isLoadingSummary}
              />
            </section>
          )}

          {!showApiKeyForm && todoistApiKey && selectedTaskFilter && (
            <section aria-labelledby="activity-summary-section">
              <h2 id="activity-summary-section" className="sr-only">
                Activity Summary
              </h2>
              <ActivitySummary
                tasks={tasksData ?? null}
                summary={completion}
                isLoadingTasks={tasksLoading}
                isLoadingSummary={isLoadingSummary}
                tasksError={tasksErrorData}
                summaryError={summaryError ?? null}
              />
            </section>
          )}
        </CardContent>
      </Card>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Didup. Helping you reflect on your
          productivity.
        </p>
      </footer>
    </main>
  );
}
