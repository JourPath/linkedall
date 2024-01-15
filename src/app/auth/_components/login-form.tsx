"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { logInWithEmail } from "../_actions";
import { signInSchema } from "../_actions/schema";
import LinkedInLogInButton from "./linked-in-log-in";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const response = await logInWithEmail(formData);
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1]">
      <img
        src="/LinkedAll_blue_logo.svg"
        className="w-16 inline py-4"
        alt="LinkedAll Blue Text Logo"
      />
      <h3 className="font-bold text-2xl pb-4 ">Log In</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isLoading}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter email address here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    autoCorrect="off"
                    autoCapitalize="none"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter password here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </form>
      </Form>
      <Separator /> or continue with <Separator />
      <LinkedInLogInButton />
    </div>
  );
};

export default LoginForm;
