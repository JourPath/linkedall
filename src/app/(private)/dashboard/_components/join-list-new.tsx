"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { joinList } from "../_actions/list-actions";
import { joinListCodeSchema } from "../_actions/schema";

export function JoinListNew() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof joinListCodeSchema>>({
    resolver: zodResolver(joinListCodeSchema),
    defaultValues: {
      short_id: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof joinListCodeSchema>) {
    try {
      const response = await joinList(formData);
      if (response?.error || response?.message) {
        toast({
          title: "Uh oh! Something went wrong",
          description: response.error || response.message,
          variant: "destructive",
        });
      } else if (response?.success) {
        router.push(`dashboard/lists/${formData.short_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-x-2 rounded-md m-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex items-center flex-1"
        >
          <FormField
            control={form.control}
            name="short_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="List Code"
                    {...field}
                    maxLength={6}
                    className="rounded-l-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex items-center rounded-r-full">
            Join List
          </Button>
        </form>
      </Form>
    </div>
  );
}
