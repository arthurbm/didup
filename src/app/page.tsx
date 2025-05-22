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
                <span>Never forget what you&apos;ve accomplished</span>
              </div>

              <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Remember everything you&apos;ve{" "}
                <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                  accomplished
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-xl leading-relaxed">
                Stop struggling to recall what you&apos;ve done. Didup connects
                to your Todoist and helps you celebrate your achievements,
                reflect on your journey, and plan your future.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base font-medium"
                  asChild
                >
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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
                Didup transforms your Todoist tasks into meaningful reflections
                of your journey
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
                    Easily recall what you&apos;ve accomplished each day, week,
                    or month. No more struggling to remember your achievements.
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
                    Review your accomplishments for any time period, from today
                    to custom date ranges, giving you complete control.
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
                className="mt-6 rounded-full px-8 py-6 text-base font-medium"
                asChild
              >
                <Link href="/dashboard">
                  Get Started Now
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
            &copy; {new Date().getFullYear()} Didup. Helping you remember and
            reflect on what you&apos;ve accomplished.
          </p>
        </div>
      </footer>
    </div>
  );
}
