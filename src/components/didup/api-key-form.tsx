"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Key, ArrowRight } from "lucide-react";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className="bg-card/30 border-border/50 focus-visible:ring-primary/20 pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md"
        >
          {isLoading ? "Connecting..." : "Connect Todoist"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
}
