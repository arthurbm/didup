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
  Menu,
  ArrowUpRight,
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
    <div className="bg-background flex min-h-screen flex-col dark:bg-black">
      {/* Minimal navbar */}
      <header className="border-border/10 border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="from-primary to-primary/60 text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br font-bold">
              D
            </div>
            <span className="text-foreground text-xl font-medium">Didup</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl flex-grow px-4 py-12">
        {showApiKeyForm || !todoistApiKey ? (
          <div className="space-y-12">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                Organize tasks, gain insights
              </h1>
              <p className="text-muted-foreground mt-4 text-xl leading-relaxed">
                Connect Didup to your Todoist account and let AI help you
                understand your productivity patterns.
              </p>
            </div>

            <Card className="bg-card/50 border-border/30 border shadow-sm">
              <CardContent className="space-y-8 p-8">
                <div className="grid gap-10 md:grid-cols-2">
                  <div className="space-y-6">
                    <h2 className="text-foreground text-2xl font-semibold">
                      Connect to Todoist
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-foreground text-base font-medium">
                            Task visibility
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            See all your tasks in a clean, organized interface
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                          <Lightbulb className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-foreground text-base font-medium">
                            AI insights
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Get intelligent analysis of your task patterns
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-foreground text-base font-medium">
                            Time-based analysis
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Analyze tasks for any period with flexible date
                            ranges
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 md:ml-0 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-foreground mb-1 text-lg font-medium">
                          Enter your Todoist API key
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          You can find your API key in Todoist settings under
                          Integrations &gt; Developer.
                        </p>
                      </div>

                      <ApiKeyForm
                        onSubmit={handleApiKeySubmit}
                        isLoading={
                          tasksLoading &&
                          todoistTasksQuery.fetchStatus !== "idle"
                        }
                      />

                      <p className="text-muted-foreground text-xs">
                        Your API key is stored securely in your browser and
                        never sent to our servers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8 pt-8 text-center">
              <div className="space-y-3">
                <h2 className="text-foreground text-xl font-medium">
                  Why connect Didup to Todoist?
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                  Didup enhances your task management experience with AI-powered
                  insights that help you understand your productivity patterns.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-card/50 border-border/30 border">
                  <CardContent className="space-y-2 p-6">
                    <div className="bg-primary/10 text-primary mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <h3 className="text-foreground font-medium">
                      Get organized
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      View your tasks in a clean, organized interface grouped by
                      due date
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/30 border">
                  <CardContent className="space-y-2 p-6">
                    <div className="bg-primary/10 text-primary mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <h3 className="text-foreground font-medium">
                      Get insights
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      AI analyzes your tasks and provides meaningful summaries
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/30 border">
                  <CardContent className="space-y-2 p-6">
                    <div className="bg-primary/10 text-primary mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <h3 className="text-foreground font-medium">
                      Be productive
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Focus on what matters with better task prioritization
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <h1 className="text-foreground text-2xl font-bold">
                  Your Task Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Select a date range to review your tasks and get AI insights
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetAndChangeKey}
                className="border-border hover:bg-accent"
              >
                Change API Key
              </Button>
            </div>

            <Card className="bg-card/50 border-border/30 border shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-foreground mb-4 text-lg font-medium">
                  Select Time Period
                </h2>
                <DateRangeSelector
                  selectedFilter={selectedTaskFilter}
                  onSelectFilter={handleFilterSelect}
                  dateRange={selectedDateRange}
                  disabled={tasksLoading || isLoadingSummary}
                />
              </CardContent>
            </Card>

            {!showApiKeyForm && todoistApiKey && selectedTaskFilter && (
              <Card className="bg-card/50 border-border/30 border shadow-sm">
                <CardContent className="p-6">
                  <ActivitySummary
                    tasks={tasksData ?? null}
                    summary={completion}
                    isLoadingTasks={tasksLoading}
                    isLoadingSummary={isLoadingSummary}
                    tasksError={tasksErrorData}
                    summaryError={summaryError ?? null}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="border-border/10 bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Didup. Helping you reflect on your
            productivity.
          </p>
        </div>
      </footer>
    </div>
  );
}
