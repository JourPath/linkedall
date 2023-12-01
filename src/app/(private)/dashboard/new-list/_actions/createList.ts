"use server";
import { z } from "zod";
import { newListFormSchema } from "./schema";

export async function createNewList(
  formData: z.infer<typeof newListFormSchema>
) {
  try {
    console.log("formData", formData);
  } catch (e) {
    return { message: "Failed to create" };
  }
}
