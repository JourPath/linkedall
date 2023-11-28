"use server"

import { createClient } from "@/lib/supabase/supabase-server";
export const readUserSession = async () => {
  const supabase = await createClient();
  return supabase.auth.getSession();
}

export const getUser = async () => {
  const supabase = await createClient();
  const {data:{session}} = await supabase.auth.getSession();
        if (!session) {
          return null;
        }
        const { data: user, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (error) {
          console.log(error);
          return null;
        } else {
          return user;
        }
};