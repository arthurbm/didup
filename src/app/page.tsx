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
  BookOpen,
  Menu,
  ArrowUpRight,
  BrainCircuit,
  Calendar,
  Sparkles,
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
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);

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

  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  const tasksData = todoistTasksQuery.data;
  const tasksLoading = todoistTasksQuery.isFetching;
  const tasksErrorData = todoistTasksQuery.error ?? null;

  return (
    <div className="bg-background dark:bg-background flex min-h-screen flex-col">
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

      <main className="container mx-auto flex-grow px-4 py-8 md:py-12">
        {showLandingPage ? (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="space-y-4 text-center">
                <div className="bg-primary/10 text-primary mb-4 inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Never forget what you&apos;ve accomplished</span>
                </div>

                <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Remember everything you&apos;ve{" "}
                  <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                    accomplished
                  </span>
                </h1>

                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-xl leading-relaxed">
                  Stop struggling to recall what you&apos;ve done. Didup
                  connects to your Todoist and helps you celebrate your
                  achievements, reflect on your journey, and plan your future.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    onClick={handleGetStarted}
                    className="rounded-full px-8 py-6 text-base font-medium"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 bg-primary/5 rounded-full px-8 py-6 text-base font-medium"
                  >
                    How it works
                  </Button>
                </div>
              </div>

              {/* Visual Element */}
              <div className="border-border/40 relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border shadow-xl">
                <div className="bg-card/50 from-primary/5 bg-gradient-to-b to-transparent p-1">
                  <div className="bg-card rounded-lg p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-destructive h-3 w-3 rounded-full"></div>
                        <div className="bg-primary h-3 w-3 rounded-full"></div>
                        <div className="bg-secondary h-3 w-3 rounded-full"></div>
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Your Accomplishments
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-accent/30 rounded-md p-3">
                        <p className="text-sm font-medium">
                          This week you completed 12 tasks across 3 projects
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary h-2 w-2 rounded-full"></div>
                          <p className="text-sm font-medium">Monday, June 10</p>
                        </div>
                        <ul className="space-y-2 pl-4">
                          <li className="bg-card border-border/40 rounded-md border p-2 text-xs">
                            Finished quarterly report
                          </li>
                          <li className="bg-card border-border/40 rounded-md border p-2 text-xs">
                            Updated website content
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-primary/20 pointer-events-none absolute inset-0 rounded-xl border"></div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <h2 className="text-foreground text-3xl font-bold">
                  How Didup helps you
                </h2>
                <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
                  Didup transforms your Todoist tasks into meaningful
                  reflections of your journey
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <Card className="bg-card/50 border-border/30 overflow-hidden border">
                  <div className="bg-primary/10 h-1.5 w-full"></div>
                  <CardContent className="space-y-3 p-6">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-xl font-medium">
                      Never forget
                    </h3>
                    <p className="text-muted-foreground">
                      Easily recall what you&apos;ve accomplished each day,
                      week, or month. No more struggling to remember your
                      achievements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/30 overflow-hidden border">
                  <div className="bg-primary/10 h-1.5 w-full"></div>
                  <CardContent className="space-y-3 p-6">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-xl font-medium">
                      AI reflections
                    </h3>
                    <p className="text-muted-foreground">
                      Get thoughtful AI-generated narratives that help you see
                      patterns and meaning in your completed work.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/30 overflow-hidden border">
                  <div className="bg-primary/10 h-1.5 w-full"></div>
                  <CardContent className="space-y-3 p-6">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-xl font-medium">
                      Flexible timeframes
                    </h3>
                    <p className="text-muted-foreground">
                      Review your accomplishments for any time period, from
                      today to custom date ranges, giving you complete control.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Testimonial/Quote Section */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-card/50 border-border/30 relative rounded-xl border p-8 md:p-10">
                <div className="text-primary absolute -top-5 left-8 text-5xl">
                  &quot;
                </div>
                <blockquote className="relative">
                  <p className="text-foreground text-lg leading-relaxed italic md:text-xl">
                    I used to struggle in meetings when asked what I&apos;d been
                    working on. Now with Didup, I can easily look back and share
                    my accomplishments with confidence.
                  </p>
                  <footer className="mt-4">
                    <div className="flex items-center">
                      <div className="bg-primary/20 h-10 w-10 rounded-full"></div>
                      <div className="ml-3">
                        <p className="text-foreground font-medium">Sarah L.</p>
                        <p className="text-muted-foreground text-sm">
                          Product Manager
                        </p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mx-auto max-w-4xl text-center">
              <div className="from-primary/10 to-primary/5 rounded-xl bg-gradient-to-b p-8 md:p-12">
                <h2 className="text-foreground text-3xl font-bold">
                  Ready to remember everything you&apos;ve done?
                </h2>
                <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
                  Connect your Todoist account and start reflecting on your
                  accomplishments today.
                </p>
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="mt-6 rounded-full px-8 py-6 text-base font-medium"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : showApiKeyForm || !todoistApiKey ? (
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                Connect your Todoist account
              </h1>
              <p className="text-muted-foreground mt-4 text-xl leading-relaxed">
                Let&apos;s help you remember and reflect on what you&apos;ve
                accomplished.
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
                            Task reflection
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            See all your completed tasks in one organized view
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                          <Lightbulb className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-foreground text-base font-medium">
                            AI summaries
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Get thoughtful narratives of what you&apos;ve
                            accomplished
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-foreground text-base font-medium">
                            Time-based review
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Look back at any period with flexible date ranges
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
          </div>
        ) : (
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <h1 className="text-foreground text-2xl font-bold">
                  Your Accomplishments
                </h1>
                <p className="text-muted-foreground mt-1">
                  Select a time period to review what you&apos;ve done
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
            &copy; {new Date().getFullYear()} Didup. Helping you remember and
            reflect on what you&apos;ve accomplished.
          </p>
        </div>
      </footer>
    </div>
  );
}
