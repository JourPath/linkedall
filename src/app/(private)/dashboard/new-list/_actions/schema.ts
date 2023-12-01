import { z } from "zod";

export const newListFormSchema = z.object({
  list_name: z.string().min(1, {
    message: "Username must be at least 1 character",
  }),
});
