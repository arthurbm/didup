"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Key, ArrowRight, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const apiKeyFormSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
});

export type ApiKeyFormData = z.infer<typeof apiKeyFormSchema>;

interface ApiKeyFormProps {
  onSubmit: (data: ApiKeyFormData) => void;
  isLoading?: boolean;
}

export function ApiKeyForm({ onSubmit, isLoading }: ApiKeyFormProps) {
  const form = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    <Key className="h-4 w-4" />
                  </div>
                  <Input
                    placeholder="Enter your Todoist API key"
                    className="bg-card/30 border-border/50 focus-visible:ring-primary/20 h-12 rounded-md pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-md"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? "Connecting..." : "Connect Todoist"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </span>
            <span className="from-primary to-primary/80 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>

          <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
            <Lock className="h-3 w-3" />
            <span>Secure connection</span>
          </div>
        </div>
      </form>
    </Form>
  );
}
