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
  type TaskDateRange,
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
  const [selectedDateRange, setSelectedDateRange] = useState<
    TaskDateRange | undefined
  >();
  const [showApiKeyForm, setShowApiKeyForm] = useState<boolean>(true);

  const todoistTasksQuery: UseQueryResult<Task[] | null, Error> = useQuery<
    Task[] | null,
    Error,
    Task[] | null,
    [string, string | null, TaskFilter | null, TaskDateRange | undefined]
  >({
    queryKey: [
      "todoistTasks",
      todoistApiKey,
      selectedTaskFilter,
      selectedDateRange,
    ],
    queryFn: async () => {
      if (!todoistApiKey || !selectedTaskFilter) {
        return null;
      }
      return getTodoistTasks(
        todoistApiKey,
        selectedTaskFilter,
        selectedDateRange,
      );
    },
    enabled: !!todoistApiKey && !!selectedTaskFilter && !showApiKeyForm,
    retry: (failureCount, error) => {
      if (error?.message?.includes("Invalid Todoist API key")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (
      todoistTasksQuery.isError &&
      todoistTasksQuery.error?.message?.includes("Invalid Todoist API key")
    ) {
      setTodoistApiKey(null);
      setShowApiKeyForm(true);
      void queryClient.invalidateQueries({
        queryKey: [
          "todoistTasks",
          todoistApiKey,
          selectedTaskFilter,
          selectedDateRange,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoistTasksQuery.isError, todoistTasksQuery.error]);

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
        queryKey: [
          "todoistTasks",
          data.apiKey,
          selectedTaskFilter,
          selectedDateRange,
        ],
      });
    }
  };

  const handleFilterSelect = (
    filter: TaskFilter,
    dateRange?: TaskDateRange,
  ) => {
    setSelectedTaskFilter(filter);
    setSelectedDateRange(dateRange);

    if (todoistApiKey) {
      void queryClient.invalidateQueries({
        queryKey: ["todoistTasks", todoistApiKey, filter, dateRange],
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
    setSelectedDateRange(undefined);
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
    <main className="container mx-auto min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
      <Card className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-center">
          <CardTitle className="mb-2 text-4xl font-extrabold tracking-tight text-white">
            Didup
          </CardTitle>
          <CardDescription className="text-xl text-indigo-100">
            Your AI-Powered Task Summary Assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          {showApiKeyForm || !todoistApiKey ? (
            <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Connect to Todoist
              </h2>
              <p className="mb-6 text-gray-600">
                Enter your Todoist API key to start analyzing your tasks. You
                can find this in your Todoist settings under Integrations &gt;
                Developer.
              </p>
              <ApiKeyForm
                onSubmit={handleApiKeySubmit}
                isLoading={
                  tasksLoading && todoistTasksQuery.fetchStatus !== "idle"
                }
              />
            </div>
          ) : (
            <section className="space-y-6">
              <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Todoist Connected
                    </h2>
                    <p className="text-gray-600">
                      Select a date range to review your tasks
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
                  dateRange={selectedDateRange}
                  disabled={tasksLoading || isLoadingSummary}
                />
              </div>

              {!showApiKeyForm && todoistApiKey && selectedTaskFilter && (
                <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
                  <ActivitySummary
                    tasks={tasksData ?? null}
                    summary={completion}
                    isLoadingTasks={tasksLoading}
                    isLoadingSummary={isLoadingSummary}
                    tasksError={tasksErrorData}
                    summaryError={summaryError ?? null}
                  />
                </div>
              )}
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
