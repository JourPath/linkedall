"use server";
import { createClientAction } from "@/lib/supabase/supabase-action";
import { cookies } from "next/headers";
import { z } from "zod";
import { profileSchema } from "./schema";

export async function updateProfile(
  formData: z.infer<typeof profileSchema>,
  avatar: string
) {
  const { full_name, linked_in, bio } = formData;
  try {
    const cookieStore = cookies();
    const supabase = await createClientAction(cookieStore);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    if (user && full_name.length > 0 && linked_in.length > 0) {
      console.log("here");
      const { data, error } = await supabase
        .from("profiles")
        .update({ full_name, linked_in, bio, avatar_url: avatar })
        .eq("id", user?.id)
        .select()
        .single();
      if (error) {
        return {
          error: error.message,
        };
      } else {
        return { data };
      }
    } else {
      return { message: "Must include Name and LinkedIn Username" };
    }
  } catch (e) {
    return { message: "Failed to update profile" };
  }
}

export async function getProfile() {
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .limit(1)
      .single();
    if (error) {
      return {
        error: error.message,
      };
    } else {
      return { data };
    }
  }
}
