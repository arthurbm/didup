"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const apiKeyFormSchema = z.object({
  apiKey: z.string().min(1, { message: "API key cannot be empty." }),
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
              <FormLabel>Todoist API Key</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Todoist API key" {...field} />
              </FormControl>
              <FormDescription>
                You can find your API token in your Todoist settings under
                Integrations &gt; Developer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Connecting..." : "Connect Todoist"}
        </Button>
      </form>
    </Form>
  );
}
