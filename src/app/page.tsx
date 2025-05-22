"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/kibo-ui/marquee";
import {
  Pill,
  PillIndicator,
  PillStatus,
  PillIcon,
} from "@/components/ui/kibo-ui/pill";
import {
  GoogleCalendarIcon,
  SlackIcon,
  NotionIcon,
  GMailIcon,
  GitHubDarkIcon,
  LinearDarkIcon,
} from "@trigger.dev/companyicons";
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
  MessageSquare,
  FileText,
  Database,
  Mail,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  Brain,
  Share2,
  CheckCircle2,
  Activity,
  Layers,
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
                Stop struggling to remember what you worked on across scattered
                tools. Didup brings everything together and helps you reflect on
                your complete work story.
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

          {/* Integrations Preview - Elegant & Minimalist */}
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="bg-primary/5 text-primary mb-6 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                <span>Seamless Integrations</span>
              </div>
              <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                Connect your{" "}
                <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                  scattered work tools
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
                One unified timeline across all your favorite platforms. No more
                context switching or forgotten accomplishments.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <Marquee className="py-8">
                <MarqueeFade side="left" className="w-32" />
                <MarqueeFade side="right" className="w-32" />
                <MarqueeContent speed={25} pauseOnHover={true}>
                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <Calendar className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Todoist
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <GoogleCalendarIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Calendar
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <Zap className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Jira
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <GitHubDarkIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          GitHub
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <SlackIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Slack
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <NotionIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Notion
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <LinearDarkIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Linear
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>

                  <MarqueeItem className="mx-6">
                    <div className="group relative">
                      <div className="bg-background/80 border-border/50 group-hover:border-primary/30 group-hover:shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        <GMailIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Gmail
                        </p>
                        <div className="mt-1 flex justify-center">
                          <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </MarqueeItem>
                </MarqueeContent>
              </Marquee>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="bg-primary/10 text-primary mb-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium">
                <Layers className="mr-2 h-4 w-4" />
                <span>Your Complete Work Ecosystem</span>
              </div>
              <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                One place for your{" "}
                <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                  entire work story
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-xl leading-relaxed">
                Transform scattered activities into meaningful insights. See
                patterns, celebrate progress, and never lose track of your
                professional journey again.
              </p>
            </div>

            {/* Interactive Demo Section - Mobile Responsive */}
            <div className="mb-16 space-y-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-xl font-semibold">
                        Unified Activity Timeline
                      </h3>
                      <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                        Every task, meeting, commit, and message in one
                        chronological view. See the full picture of your work
                        across all platforms.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill className="border-blue-500/20 bg-blue-500/10 text-blue-600">
                          <PillIndicator variant="info" />
                          <PillStatus className="hidden sm:block">
                            Tasks
                          </PillStatus>
                          <span className="sm:hidden">Tasks:</span>
                          <span>12 completed</span>
                        </Pill>
                        <Pill className="border-green-500/20 bg-green-500/10 text-green-600">
                          <PillIndicator variant="success" />
                          <PillStatus className="hidden sm:block">
                            Meetings
                          </PillStatus>
                          <span className="sm:hidden">Meetings:</span>
                          <span>8 attended</span>
                        </Pill>
                        <Pill className="border-purple-500/20 bg-purple-500/10 text-purple-600">
                          <PillIndicator variant="info" />
                          <PillStatus className="hidden sm:block">
                            Commits
                          </PillStatus>
                          <span className="sm:hidden">Commits:</span>
                          <span>23 pushed</span>
                        </Pill>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-xl font-semibold">
                        AI-Powered Insights
                      </h3>
                      <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                        Smart analysis of your work patterns reveals
                        productivity trends, collaboration insights, and
                        meaningful accomplishments.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill className="border-amber-500/20 bg-amber-500/10 text-amber-600">
                          <PillIcon icon={TrendingUp} />
                          <span>Productivity +15%</span>
                        </Pill>
                        <Pill className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
                          <PillIcon icon={Target} />
                          <span>Goals on track</span>
                        </Pill>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                      <Share2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-xl font-semibold">
                        Instant Sharing & Reports
                      </h3>
                      <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                        Generate beautiful summaries for standups, reviews, or
                        reports in seconds. Your work story, perfectly
                        presented.
                      </p>
                      <div className="mt-4">
                        <Pill className="border-indigo-500/20 bg-indigo-500/10 text-indigo-600">
                          <PillIcon icon={Clock} />
                          <span>Ready in 3 seconds</span>
                        </Pill>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Preview - Mobile Optimized */}
              <div className="relative">
                <div className="border-border/40 bg-card/30 overflow-hidden rounded-2xl border shadow-2xl lg:sticky lg:top-8">
                  <div className="bg-card/50 border-border/30 border-b p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex gap-1.5">
                          <div className="bg-destructive h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"></div>
                          <div className="bg-primary h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"></div>
                          <div className="bg-secondary h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"></div>
                        </div>
                        <span className="text-muted-foreground text-xs font-medium sm:text-sm">
                          Your Work Dashboard
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Pill className="border-green-500/20 bg-green-500/10 text-xs text-green-600">
                          <PillIndicator variant="success" pulse />
                          <span>Live</span>
                        </Pill>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 sm:p-6">
                    <div className="space-y-3">
                      <h4 className="text-foreground flex items-center gap-2 text-sm font-medium sm:text-base">
                        <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        This Week&apos;s Impact
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            Tasks Completed
                          </span>
                          <Pill className="border-blue-500/20 bg-blue-500/10 text-xs text-blue-600">
                            <span className="font-medium">24</span>
                          </Pill>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            Code Reviews
                          </span>
                          <Pill className="border-purple-500/20 bg-purple-500/10 text-xs text-purple-600">
                            <span className="font-medium">8</span>
                          </Pill>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            Team Meetings
                          </span>
                          <Pill className="border-green-500/20 bg-green-500/10 text-xs text-green-600">
                            <span className="font-medium">12</span>
                          </Pill>
                        </div>
                      </div>
                    </div>

                    <div className="border-border/30 border-t pt-4">
                      <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-medium sm:text-base">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        AI Summary
                      </h4>
                      <div className="bg-primary/5 border-primary/20 rounded-lg border p-3">
                        <p className="text-foreground text-xs leading-relaxed sm:text-sm">
                          &quot;This week you&apos;ve shown exceptional focus on
                          the authentication system, completing 8 related tasks
                          and conducting thorough code reviews. Your
                          collaboration in team meetings has been particularly
                          valuable for project alignment.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-xs sm:text-sm">
                        <Share2 className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Share Summary</span>
                        <span className="sm:hidden">Share</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs sm:text-sm"
                      >
                        <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="border-border/30 bg-card/50 rounded-2xl border p-8 md:p-12">
              <div className="mb-12 text-center">
                <h3 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                  Transform how you{" "}
                  <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                    track your work
                  </span>
                </h3>
                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
                  Join professionals who never lose track of their
                  accomplishments
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="text-foreground mb-2 text-3xl font-bold">
                    15min
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    Average time saved per standup meeting
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="text-foreground mb-2 text-3xl font-bold">
                    3x
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    Better visibility into work patterns
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Layers className="h-8 w-8" />
                  </div>
                  <div className="text-foreground mb-2 text-3xl font-bold">
                    8+
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    Integrations planned for 2024
                  </div>
                </div>
              </div>
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
