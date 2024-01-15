"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createNewList } from "../../_actions/list-actions";
import { newListFormSchema } from "../../_actions/schema";

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
import { useRouter } from "next/navigation";

export function NewListForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof newListFormSchema>>({
    resolver: zodResolver(newListFormSchema),
    defaultValues: {
      list_name: "New List",
    },
  });

  async function onSubmit(formData: z.infer<typeof newListFormSchema>) {
    try {
      const response = await createNewList(formData);
      if (response?.error) {
        if (
          response?.error.includes("new row violates row-level security policy")
        ) {
          toast({
            title: "Max Lists Reached",
            description:
              "You have reached maximum lists for your plan. Please upgrade to create more lists.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong",
            description: response.error,
            variant: "destructive",
          });
        }
      } else if (response?.data) {
        toast({
          title: "List Created!",
          description: `Your list: ${response.data.list_name}  has been created.`,
          variant: "default",
        });
        router.push(`lists/${response.data.short_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-8">
        <FormField
          control={form.control}
          name="list_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Name</FormLabel>
              <FormControl>
                <Input placeholder="My List" {...field} />
              </FormControl>
              <FormDescription>
                This is the public name of your list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
