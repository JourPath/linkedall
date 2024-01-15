"use server"

import { cookies } from "next/headers";
import { createClientAction } from "../supabase-action";
export const readUserSession = async () => {
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  return supabase.auth.getSession();
}

export const getUser = async () => {
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
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