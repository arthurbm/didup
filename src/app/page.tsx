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
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Lightbulb,
  PenTool,
} from "lucide-react";

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
    <div className="bg-background flex min-h-screen flex-col">
      {/* Hero section with gradient background */}
      <header className="from-primary to-primary/75 text-primary-foreground bg-gradient-to-r py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Didup
          </h1>
          <p className="text-primary-foreground/90 mx-auto max-w-2xl text-xl md:text-2xl">
            Transform your task management with AI-powered insights
          </p>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-8 md:py-12">
        <Card className="border-border/30 mx-auto w-full max-w-4xl overflow-hidden rounded-xl shadow-xl">
          {showApiKeyForm || !todoistApiKey ? (
            <div className="space-y-6">
              <CardHeader className="bg-accent/50 pb-6 text-center">
                <CardTitle className="text-foreground text-3xl font-bold">
                  Get Started with Didup
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2 text-lg">
                  Your personal AI assistant for task management and
                  productivity
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-6 pb-8 md:px-8">
                <div className="bg-card border-border/30 rounded-lg border p-6 shadow-sm">
                  <h2 className="text-foreground mb-4 text-2xl font-semibold">
                    Connect to Todoist
                  </h2>

                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start">
                        <div className="bg-primary/10 mr-3 rounded-full p-2">
                          <CheckCircle className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium">
                            Comprehensive Overview
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Get a clear picture of all your tasks in one place
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 mr-3 rounded-full p-2">
                          <Clock className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium">
                            Save Time
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Quickly understand your priorities without manual
                            review
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start">
                        <div className="bg-primary/10 mr-3 rounded-full p-2">
                          <Lightbulb className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium">
                            AI-Powered Insights
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Get intelligent summaries of your task patterns
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 mr-3 rounded-full p-2">
                          <PenTool className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium">
                            Custom Date Ranges
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Analyze tasks for any time period you choose
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Enter your Todoist API key to start analyzing your tasks.
                    You can find this in your Todoist settings under
                    Integrations &gt; Developer.
                  </p>

                  <ApiKeyForm
                    onSubmit={handleApiKeySubmit}
                    isLoading={
                      tasksLoading && todoistTasksQuery.fetchStatus !== "idle"
                    }
                  />
                </div>

                <div className="px-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Your API key is stored locally in your browser. We never
                    store your data on our servers.
                  </p>
                </div>
              </CardContent>
            </div>
          ) : (
            <div>
              <CardHeader className="bg-accent/50 pb-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-foreground text-2xl font-bold">
                      Task Dashboard
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      Select a date range to review your tasks and get AI
                      insights
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetAndChangeKey}
                    className="border-border hover:bg-accent shrink-0"
                  >
                    Change API Key
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-8 p-6 md:p-8">
                <div className="bg-card border-border/30 rounded-lg border p-6 shadow-sm">
                  <h3 className="text-foreground mb-4 text-lg font-medium">
                    Select Time Period
                  </h3>
                  <DateRangeSelector
                    selectedFilter={selectedTaskFilter}
                    onSelectFilter={handleFilterSelect}
                    dateRange={selectedDateRange}
                    disabled={tasksLoading || isLoadingSummary}
                  />
                </div>

                {!showApiKeyForm && todoistApiKey && selectedTaskFilter && (
                  <div className="bg-card border-border/30 rounded-lg border p-6 shadow-sm">
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
              </CardContent>
            </div>
          )}
        </Card>
      </main>

      <footer className="bg-accent/30 border-border/20 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Didup. Helping you reflect on your
            productivity.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="#"
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
