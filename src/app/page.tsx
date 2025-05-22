"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Calendar,
  Menu,
  Sparkles,
  Zap,
  GitBranch,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
              <div className="bg-primary/10 text-primary mb-4 inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Connect all your work tools in one place</span>
              </div>

              <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Never lose track of your{" "}
                <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                  work journey
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-xl leading-relaxed">
                Stop struggling to remember what you worked on across Todoist,
                Jira, Calendar, and other scattered tools. Didup brings
                everything together and helps you reflect on your complete work
                story.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base font-medium"
                  asChild
                >
                  <Link href="/dashboard">
                    Connect Your Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 bg-primary/5 rounded-full px-8 py-6 text-base font-medium"
                >
                  See Integrations
                </Button>
              </div>
            </div>

            {/* Visual Element - Updated to show multiple sources */}
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
                      Your Complete Work Story
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-accent/30 rounded-md p-3">
                      <p className="text-sm font-medium">
                        This week: 12 tasks completed, 8 meetings attended, 3
                        tickets resolved
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <p className="text-sm font-medium">Todoist</p>
                        <span className="text-muted-foreground text-xs">
                          • Finished quarterly report
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <p className="text-sm font-medium">Calendar</p>
                        <span className="text-muted-foreground text-xs">
                          • Team standup, Client presentation
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <p className="text-sm font-medium">Jira</p>
                        <span className="text-muted-foreground text-xs">
                          • Fixed authentication bug
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-primary/20 pointer-events-none absolute inset-0 rounded-xl border"></div>
            </div>
          </div>

          {/* Integrations Preview */}
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold">
                Connect your scattered work tools
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
                Didup integrates with the tools you already use, creating a
                unified view of your work across platforms
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
              <div className="bg-card/50 border-border/30 flex flex-col items-center gap-2 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Todoist</span>
              </div>

              <div className="bg-card/50 border-border/30 flex flex-col items-center gap-2 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Google Calendar</span>
              </div>

              <div className="bg-card/50 border-border/30 flex flex-col items-center gap-2 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Jira</span>
              </div>

              <div className="bg-card/50 border-border/30 flex flex-col items-center gap-2 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                  <GitBranch className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </div>

              <div className="bg-card/50 border-border/30 flex flex-col items-center gap-2 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Slack</span>
              </div>

              <div className="bg-card/50 border-border/30 flex flex-col items-center gap-2 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/10 text-gray-600">
                  <span className="text-xs font-bold">+</span>
                </div>
                <span className="text-sm font-medium">More soon</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-3xl font-bold">
                One place for your entire work story
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
                Transform scattered activities into meaningful insights about
                your work journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card/50 border-border/30 overflow-hidden border">
                <div className="bg-primary/10 h-1.5 w-full"></div>
                <CardContent className="space-y-3 p-6">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-foreground text-xl font-medium">
                    Unified timeline
                  </h3>
                  <p className="text-muted-foreground">
                    See everything you worked on across all platforms in one
                    chronological view. No more hunting through different apps.
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
                    Smart insights
                  </h3>
                  <p className="text-muted-foreground">
                    AI analyzes your work patterns across tools to give you
                    meaningful summaries and help you understand your impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/30 overflow-hidden border">
                <div className="bg-primary/10 h-1.5 w-full"></div>
                <CardContent className="space-y-3 p-6">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-foreground text-xl font-medium">
                    Easy sharing
                  </h3>
                  <p className="text-muted-foreground">
                    Quickly generate summaries for standups, reviews, or
                    reports. Never struggle to remember what you&apos;ve been
                    working on.
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
                  I used to spend 15 minutes before every standup trying to
                  remember what I worked on yesterday across Jira, Slack, and my
                  calendar. Now I just open Didup and have everything ready in
                  seconds.
                </p>
                <footer className="mt-4">
                  <div className="flex items-center">
                    <div className="bg-primary/20 h-10 w-10 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-foreground font-medium">Marcus R.</p>
                      <p className="text-muted-foreground text-sm">
                        Software Engineer
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
                Ready to see your complete work story?
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
                Connect your tools and start getting a unified view of
                everything you&apos;ve accomplished.
              </p>
              <Button
                size="lg"
                className="mt-6 rounded-full px-8 py-6 text-base font-medium"
                asChild
              >
                <Link href="/dashboard">
                  Start Connecting Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-border/10 bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Didup. Bringing your scattered
            work life together.
          </p>
        </div>
      </footer>
    </div>
  );
}
