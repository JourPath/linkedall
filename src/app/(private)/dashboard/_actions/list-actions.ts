"use server";
import { createClient } from "@/lib/supabase/supabase-server";
import { z } from "zod";
import { joinListCodeSchema, newListFormSchema } from "./schema";

export async function createNewList(
  formData: z.infer<typeof newListFormSchema>
) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    if (user) {
      const { data, error } = await supabase
        .from("lists")
        .insert({ list_name: formData.list_name, host_id: user.id })
        .select()
        .single();
      if (error) {
        return {
          error: error.message,
        };
      } else {
        return { data };
      }
    }
  } catch (e) {
    return { message: "Failed to create" };
  }
}

export async function joinList(formData: z.infer<typeof joinListCodeSchema>) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    if (user) {
      const { data: list_data, error: get_list_error } = await supabase.rpc(
        "get_list_from_short_id",
        {
          shortid: formData.short_id,
        }
      );
      if (get_list_error) {
        return {
          error: get_list_error.message,
        };
      }
      const { id } = list_data[0];
      const { error } = await supabase
        .from("list_participants")
        .insert({ list_id: id, participant_id: user.id });
      if (error) {
        return {
          error: error.message,
        };
      } else {
        return { success: true };
      }
    }
  } catch (e) {
    return { message: "Failed to join list" };
  }
}

export async function getList(short_id: string) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    if (user) {
      const { data: list_data, error: get_list_error } = await supabase.rpc(
        "get_list_from_short_id",
        {
          shortid: short_id,
        }
      );

      if (get_list_error) {
        return {
          error: get_list_error,
        };
      }
      const { data: list_participants, error: get_participants_error } =
        await supabase.rpc("get_list_participants", {
          list_id_param: list_data[0].id as string,
          profile_id_param: user?.id,
        });

      if (get_participants_error) {
        return {
          error: get_participants_error,
        };
      } else {
        return {
          data: {
            list: list_data[0],
            list_participants,
            user_id: user.id,
          },
        };
      }
    }
  } catch (e) {
    return { message: "Failed to retrieve list " };
  }
}
