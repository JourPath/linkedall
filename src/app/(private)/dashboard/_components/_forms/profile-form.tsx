"use client";
import { Profile } from "@/utils/types/collections.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { profileSchema } from "../../_actions/schema";

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
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "../../_actions/profile-actions";

export default function ProfileForm({
  profile,
  avatar,
  edit,
  setEdit,
}: {
  profile: Profile;
  avatar: string;
  edit: boolean;
  setEdit: Function;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      linked_in: profile.linked_in || "",
      bio: profile.bio,
    },
  });

  async function onSubmit(formData: z.infer<typeof profileSchema>) {
    console.log(formData);
    try {
      const response = await updateProfile(formData, avatar);
      if (response?.error || response?.message) {
        toast({
          title: "Uh oh! Something went wrong",
          description: response.error || response.message,
          variant: "destructive",
        });
      } else if (response?.data) {
        toast({
          title: "Success!",
          description: "Profile updated successfully!",
          variant: "default",
        });
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={!edit}
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription className={`${!edit ? "hidden" : ""}`}>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!edit}
          control={form.control}
          name="linked_in"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Username</FormLabel>
              <FormDescription
                className={`break-words ${!edit ? "hidden" : ""}`}
              >
                Found in URL of your LinkedIn profile
                https://www.linkedin.com/in/
                <span className="font-bold">username</span>
              </FormDescription>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!edit}
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tell us a little about yourself."
                  {...field}
                  maxLength={200}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!edit} type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
